const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/location/unregister_from_partner',
    handler: async (request, h) => {
      try {
        const { authToken, locationId, partnerId } = request.payload

        if (authToken && partnerId && locationId) {
          const response = await apiCall(
            {
              authToken: authToken,
              locationId: locationId,
              partnerId: partnerId
            },
            'location/unregisterFromPartner'
          )
          return h.response(response)
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
