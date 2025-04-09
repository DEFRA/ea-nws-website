const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { updateContact } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/organization/promote_contact',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, contactId, role, orgId } = request.payload
        const { redis } = request.server.app

        if (authToken && contactId && role && orgId) {
          const response = await apiCall(
            { authToken: authToken, contactId: contactId, role: role },
            'organization/promoteContact'
          )
          if (response?.data?.contact) {
            await updateContact(redis, orgId, response.data.contact)
            return h.response({ status: 200, data: response.data.contact })
          } else {
            return createGenericErrorResponse(h)
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
