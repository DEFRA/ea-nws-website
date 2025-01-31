const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { listLinkedLocations } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/elasticache/list_linked_locations',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { orgId, contact } = request.payload

        if (orgId) {
          const result = await listLinkedLocations(orgId, contact.id)
          
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
