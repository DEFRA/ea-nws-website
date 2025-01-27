const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { removeContact } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/organization/remove_contacts',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, orgId, removeContactIDs } = request.payload

        if (authToken && orgId && removeContactIDs) {
          const response = await apiCall(
            { authToken: authToken, contactIds: removeContactIDs },
            'organization/removeContacts'
          )

          if (response.status === 200) {
            await Promise.all(removeContactIDs.map(async (contactID) => {
              await removeContact(orgId, contactID)
            }))
            return h.response({ status: 200 })
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
