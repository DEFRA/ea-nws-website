const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/partner/update_location_registration',

    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, locationId, partnerId, params } = request.payload

        if (authToken && partnerId && Object.keys(params).length > 0) {
          const response = await apiCall(
            {
              authToken: authToken,
              locationId: locationId,
              partnerId: partnerId,
              params: params
            },
            'member/updateLocationRegistration'
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
