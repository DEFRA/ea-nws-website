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
        const { orgId } = request.payload
        const { redis } = request.server.app

        if (orgId) {
          const { sessionId } = request.auth.credentials
          const sessionKey = `session:${sessionId}`
          const sessionData = await getJsonData(redis, sessionKey)

          console.log('org id passed by request', orgId)
          console.log('org id in session', sessionData.orgId)

          if (!sessionData || sessionData.orgId !== orgId) {
            return createGenericErrorResponse(h)
          }

          const result = await listContacts(redis, orgId)
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
