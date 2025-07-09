const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { listContacts, getJsonData } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/elasticache/list_contacts',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { sessionKey } = request.payload
        const { redis } = request.server.app

        const sessionData = await getJsonData(redis, sessionKey)

        if (!sessionData) {
          return createGenericErrorResponse(h)
        }

        const result = await listContacts(redis, sessionData?.orgId)
        if (result) {
          return h.response({ status: 200, data: result })
        } else {
          return h.response({ status: 200 })
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
