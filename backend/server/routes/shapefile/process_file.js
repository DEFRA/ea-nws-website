const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { scanResults } = require('../../services/bulk_uploads/scanResults')
const { setJsonData } = require('../../services/elasticache')
const { processShapefile } = require('../../services/shapefile/processShapefile')

module.exports = [
  {
    method: ['POST'],
    path: '/api/shapefile/process_file',
    handler: async (request, h) => {
      try {
        if (request.payload.Message) {
          const fileName = request.payload.Message
          const elasticacheKey = 'shapefile:' + fileName.split('.')[0]
          await setJsonData(elasticacheKey, { stage: 'Scanning Upload', status: 'working' })
          const scanResult = await scanResults(request.payload.Message, 'zip-uploads/zip')
          if (scanResult?.data?.scanComplete === true) {
            if (scanResult?.data?.scanResult === 'THREATS_FOUND') {
              await setJsonData(elasticacheKey, { stage: 'Scanning Upload', status: 'rejected', error: [{ errorType: 'virus', errorMessage: 'The selected file contains a virus' }] })
            } else if (scanResult?.data?.scanResult === 'NO_THREATS_FOUND') {
              await setJsonData(elasticacheKey, { stage: 'Processing', status: 'working' })
              const response = await processShapefile(request.payload.Message)
              if (response.errorMessage) {
                await setJsonData(elasticacheKey, { stage: 'Processing', status: 'rejected', error: response.errorMessage })
              } else if (response.data) {
                await setJsonData(elasticacheKey, { stage: 'Processing', status: 'complete', data: response.data })
              } else {
                await setJsonData(elasticacheKey, { stage: 'Processing', status: 'rejected', error: [{ errorType: 'generic', errorMessage: 'Unknown error' }] })
              }
            } else {
              await setJsonData(elasticacheKey, { stage: 'Scanning Upload', status: 'rejected', error: [{ errorType: 'generic', errorMessage: 'Error Scanning File' }] })
            }
          } else {
            await setJsonData(elasticacheKey, { stage: 'Scanning Upload', status: 'rejected', error: [{ errorType: 'generic', errorMessage: 'Error Scanning File' }] })
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
