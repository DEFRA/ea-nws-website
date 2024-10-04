const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { processLocations } = require('../../services/bulk_uploads/processLocations')
const { setJsonData } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/bulk_uploads/process_file',
    handler: async (request, h) => {
      console.log(request)
      try {
        console.log(request.payload)
        if (request.payload.Message) {
          const fileName = request.payload.Message
          const elasticacheKey = 'bulk_upload:' + fileName.split('.')[0]
          console.log(elasticacheKey)
          await setJsonData(elasticacheKey, { stage: 'Processing', status: 'working' })
          const response = await processLocations(request.payload.Message)
          console.log(response)
          if (response.errorMessage) {
            await setJsonData(elasticacheKey, { stage: 'Processing', status: 'rejected', error: response.errorMessage })
          } else if (response.data) {
            await setJsonData(elasticacheKey, { stage: 'Processing', status: 'complete', data: response.data })
          } else {
            await setJsonData(elasticacheKey, { stage: 'Processing', status: 'rejected', error: 'Unknown error' })
          }

          return h.response({ status: 200 })
        } else {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
