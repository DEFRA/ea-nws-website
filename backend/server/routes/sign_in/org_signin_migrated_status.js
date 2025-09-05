const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const {
  getJsonData
} = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/org_signin_migrated_status',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { authToken } = request.payload
        const { redis } = request.server.app
        const sessionData = await getJsonData(redis, authToken)

        if (authToken) {
          const elasticacheKey = 'migrated_signin_status:' + sessionData.orgId
          const result = await getJsonData(redis, elasticacheKey)
          if (result) {
            return h.response({ status: 200, data: result }).header('Cache-Control', 'no-cache, no-store, must-revalidate')
          } else {
            return h.response({ status: 200 }).header('Cache-Control', 'no-cache, no-store, must-revalidate')
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
