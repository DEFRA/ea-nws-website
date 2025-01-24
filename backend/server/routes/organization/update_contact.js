const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { updateContact } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/organization/update_contact',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, orgId, contact } = request.payload
        if (authToken && orgId && contact) {
          // remove any null fields from each contact
          Object.keys(contact).forEach((key) => {
            if (contact[key] === null && key !== 'id') {
              delete contact[key]
            }
          })

          const response = await apiCall(
            { authToken: authToken, contact: contact },
            'organization/updateContact'
          )
          if (response.data.contact) {
            await updateContact(orgId, response.data.contact)
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
