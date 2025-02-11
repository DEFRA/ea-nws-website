const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { removeLinkedContacts } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/location/detach_contacts',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, orgId, locationId, contactIds } = request.payload

        if (authToken && orgId && locationId && contactIds) {
          const response = await apiCall(
            { authToken: authToken, locationId: locationId, contactIds: contactIds },
            'location/detachContacts'
          )

          if (response.status === 200) {
            await removeLinkedContacts(orgId, locationId, contactIds)
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
