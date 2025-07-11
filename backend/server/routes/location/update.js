const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { updateLocation, getJsonData } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/location/update',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, location } = request.payload
        const { redis } = request.server.app
        const sessionData = await getJsonData(redis, authToken)

        if (authToken && location && sessionData.orgId) {
          const response = await apiCall(
            { authToken: authToken, location: location },
            'location/update'
          )
          if (response.data.location) {
            await updateLocation(
              redis,
              sessionData.orgId,
              response.data.location
            )
            return h.response({ status: 200, data: response.data.location })
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
