const { logger } = require('../../plugins/logging')
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
        const { type, paths, authToken } = request.payload
        const { redis } = request.server.app
        const sessionData = await getJsonData(redis, authToken)
        const key = sessionData?.orgId + type

        if (key) {
          let result
          if (paths) {
            result = await getJsonData(redis, key, paths)
          } else {
            result = await getJsonData(redis, key)
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
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
