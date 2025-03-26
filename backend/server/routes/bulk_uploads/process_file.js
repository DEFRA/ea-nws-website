const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { processLocations, addFloodData } = require('../../services/bulk_uploads/processLocations')
const { scanResults } = require('../../services/bulk_uploads/scanResults')
const { setJsonData, listLocationNames } = require('../../services/elasticache')

const DUPLICATE = 'duplicate'

module.exports = [
  {
    method: ['POST'],
    path: '/api/bulk_uploads/process_file',
    handler: async (request, h) => {
      try {
        if (request.payload.Message) {
          const fileName = request.payload.Message
          const orgId = request.payload.orgId
          const elasticacheKey = 'bulk_upload:' + fileName.split('.')[0]
          await setJsonData(elasticacheKey, { stage: 'Scanning upload', status: 'working' })
          const scanResult = await scanResults(request.payload.Message, 'csv-uploads')
          if (scanResult?.data?.scanComplete === true) {
            if (scanResult?.data?.scanResult === 'THREATS_FOUND') {
              await setJsonData(elasticacheKey, { stage: 'Scanning upload', status: 'rejected', error: [{ errorType: 'virus', errorMessage: 'The selected file contains a virus' }] })
            } else if (scanResult?.data?.scanResult === 'NO_THREATS_FOUND') {
              await setJsonData(elasticacheKey, { stage: 'Validating locations', status: 'working' })
              const response = await processLocations(request.payload.Message)
              if (response.errorMessage) {
                await setJsonData(elasticacheKey, { stage: 'Validating locations', status: 'rejected', error: response.errorMessage })
              } else if (response.data) {
                await setJsonData(elasticacheKey, { stage: response.data?.invalid?.length + response.data?.valid?.length + ' locations validated', status: 'working' })
                // Check invalid locations for duplicates
                const locationNames = await listLocationNames(orgId)
                for (const location of response.data.invalid) {
                  if (location.error.includes(DUPLICATE)) return
                  if (locationNames.includes(location.Location_name)) {
                    // An invalid location should already have at least one error
                    // but do not assume this is the case
                    if (Array.isArray(location.error)) {
                      location.error.push(DUPLICATE)
                    } else {
                      location.error = [DUPLICATE]
                    }
                  }
                }
                // Now check valid locations and move any duplicates
                // to invalid locations and mark as duplicates. Note that
                // we don't use forEach in this case because we could be
                // removing elements from valid locations.
                for (let i = 0; i < response.data.valid.length; i++) {
                  const location = response.data.valid[i]
                  if (locationNames.includes(location.Location_name)) {
                    response.data.valid.splice(i, 1)
                    // It seems reasonable to assume that a valid location
                    // will have no existing errors at this stage
                    location.error = [DUPLICATE]
                    response.data.invalid.push(location)
                    --i
                  }
                }
                await setJsonData(elasticacheKey, { stage: 'Associating flood data', status: 'working' })
                const finalResult = await addFloodData(response.data)
                await setJsonData(elasticacheKey, { stage: 'Associating flood data', status: 'complete', data: finalResult.data })
              } else {
                await setJsonData(elasticacheKey, { stage: 'Validating locations', status: 'rejected', error: [{ errorType: 'generic', errorMessage: 'Unknown error' }] })
              }
            } else {
              await setJsonData(elasticacheKey, { stage: 'Scanning upload', status: 'rejected', error: [{ errorType: 'generic', errorMessage: 'Error Scanning File' }] })
            }
          } else {
            await setJsonData(elasticacheKey, { stage: 'Scanning upload', status: 'rejected', error: [{ errorType: 'generic', errorMessage: 'Error Scanning File' }] })
          }

          return h.response({ status: 200 })
        } else {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
