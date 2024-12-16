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

        const { authToken, orgId, contactIDs } = request.payload
        if (authToken && orgId && contactIDs) {
          const response = await apiCall(
            { authToken: authToken, contactIDs: contactIDs },
            'organization/removeContacts'
          )
          if (response.status === 200) {
            await Promise.all(contactIDs.map(async (contactID) => {
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
        return createGenericErrorResponse(h)
      }
    }
  }
]
