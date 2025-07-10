const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { listLinkedContacts, getLinkedContactsCount } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/elasticache/list_linked_contacts',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { orgId, locationId } = request.payload
        const { redis } = request.server.app

        if (orgId) {
          let result
          if (locationId) {
            result = await listLinkedContacts(redis, orgId, locationId)
          } else {
            result = await getLinkedContactsCount(redis, orgId)
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
