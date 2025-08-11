const { EMAIL_IN_USE_ERROR_MSG } = require('../../constants/errorMessages')
const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { updateContact, getJsonData } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/organization/update_contact',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, contact } = request.payload
        const { redis } = request.server.app
        const sessionData = await getJsonData(redis, authToken)

        if (authToken && sessionData.orgId && contact) {
          // remove any null fields from each contact
          Object.keys(contact).forEach((key) => {
            if (contact[key] === null && key !== 'id') {
              delete contact[key]
            }
            if (key === 'pois') {
              delete contact[key]
            }
          })

          const response = await apiCall(
            { authToken: authToken, contact: contact },
            'organization/updateContact'
          )

          // Email already in use in another account
          if (response?.data?.code === 107) {
            return h.response({
              status: 409,
              errorMessage: EMAIL_IN_USE_ERROR_MSG
            })
          } else if (response?.data?.contact) {
            await updateContact(redis, sessionData.orgId, response.data.contact)
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
