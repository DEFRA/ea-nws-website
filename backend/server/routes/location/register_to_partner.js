const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/location/register_to_partner',
    handler: async (request, h) => {
      try {
        const { authToken, locationId, partnerId, params } = request.payload

        if (authToken && partnerId && locationId && Object.keys(params).length > 0) {
          const response = await apiCall(
            {
              authToken: authToken,
              locationId: locationId,
              partnerId: partnerId,
              params: params
            },
            'location/registerToPartner'
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
