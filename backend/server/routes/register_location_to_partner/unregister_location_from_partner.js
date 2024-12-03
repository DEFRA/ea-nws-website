const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/partner/unregister_location_from_partner',

    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, locationId, partnerId } = request.payload

        if (authToken && partnerId) {
          const response = await apiCall(
            {
              authToken: authToken,
              locationId: locationId,
              partnerId: partnerId
            },
            'member/unregisterLocationFromPartner'
          )
          return h.response(response)
        } else {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
