const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const {
  findLocationByName,
  findInvLocationByName,
  getJsonData
} = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/locations/search',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { authToken, locationName, type } = request.payload
        const { redis } = request.server.app
        const sessionData = await getJsonData(redis, authToken)

        if (locationName && sessionData.orgId) {
          const result =
            type === 'valid'
              ? await findLocationByName(redis, sessionData.orgId, locationName)
              : await findInvLocationByName(
                  redis,
                  sessionData.orgId,
                  locationName
                )
          if (result) {
            return h.response({ status: 200, data: result })
          } else {
            return h.response({ status: 200 })
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
