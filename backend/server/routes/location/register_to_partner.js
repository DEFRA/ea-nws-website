const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { addToAlert } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/location/register_to_partner',
    handler: async (request, h) => {
      try {
        const { authToken, location, partnerId, params } = request.payload

        if (authToken && partnerId && Object.keys(params).length > 0) {
          const response = await apiCall(
            {
              authToken: authToken,
              locationId: location.id,
              partnerId: partnerId,
              params: params
            },
            'location/registerToPartner'
          )

          if (response.status === 200) {
            await addToAlert(orgId, location)
            return h.response(response)
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
