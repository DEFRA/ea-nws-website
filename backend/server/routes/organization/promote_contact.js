const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { updateContact, getJsonData } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/organization/promote_contact',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, contactId, role } = request.payload
        const { redis } = request.server.app
        const sessionData = await getJsonData(redis, authToken)

        if (authToken && contactId && role && sessionData.orgId) {
          const response = await apiCall(
            { authToken: authToken, contactId: contactId, role: role },
            'organization/promoteContact'
          )
          if (response?.data?.contact) {
            await updateContact(redis, sessionData.orgId, response.data.contact)
            return h.response({ status: 200, data: response.data.contact })
          }
          // Checking in case the contact is already registered on another citizen / org account
          else if (
            response?.data?.code === 107 ||
            response?.data?.desc.includes('already existing account')
          ) {
            return h.response({
              status: 409,
              errorMessage:
                "You cannot enter this email address as it's already in use - try a different email address"
            })
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
