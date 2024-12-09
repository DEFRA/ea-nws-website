const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { addLocation } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/location/create',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, orgId, location } = request.payload
        if (authToken && location && orgId) {
          const response = await apiCall(
            { authToken: authToken, location: location },
            'location/create'
          )
          if (response.location) {
            await addLocation(orgId, response.location)
            return h.response({ status: 200, data: response.location })
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
