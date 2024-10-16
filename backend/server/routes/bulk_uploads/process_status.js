const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { getJsonData } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/bulk_uploads/process_status',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { fileName } = request.payload

        if (fileName) {
          const elasticacheKey = 'bulk_upload:' + fileName.split('.')[0]

          const result = await getJsonData(elasticacheKey)
          if (result) {
            return h.response({ status: 200, data: result })
          } else {
            return h.response({ status: 200 })
          }
        } else {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
