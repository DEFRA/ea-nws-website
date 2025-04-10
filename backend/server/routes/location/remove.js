const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { removeLocation } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/location/remove',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, orgId, locationIds } = request.payload
        const { redis } = request.server.app

        if (authToken && locationIds && orgId) {
          const response = await apiCall(
            { authToken: authToken, locationIds: locationIds },
            'location/remove'
          )
          if (response.status === 200) {
            await Promise.all(locationIds.map(async (id) => {
              await removeLocation(redis, orgId, id)
            }))
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
