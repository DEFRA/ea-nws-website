const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { addContact } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/organization/create_contacts',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, orgId, contacts } = request.payload
        if (authToken && orgId && contacts) {
          const response = await apiCall(
            { authToken: authToken, contacts: contacts },
            'organization/createContacts'
          )
          if (response.status === 200) {
            await Promise.all(contacts.map(async (contact) => {
              await addContact(orgId, contact)
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
