const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { getJsonData } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/elasticache/get_data',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { key, paths } = request.payload

        if (key) {
          let result
          if (paths) {
            result = await getJsonData(key, paths)
          } else {
            result = await getJsonData(key)
          }
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
