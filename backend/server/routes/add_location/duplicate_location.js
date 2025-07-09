const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const {
  findLocationByName,
  getJsonData
} = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/locations/check_duplicate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { authToken, locationName } = request.payload
        const { redis } = request.server.app
        const sessionData = await getJsonData(redis, authToken)

        if (locationName && orgId) {
          const duplicate = await findLocationByName(
            redis,
            sessionData.orgId,
            locationName
          )
          if (duplicate.length !== 0) {
            return h.response({
              status: 500,
              errorMessage: 'duplicate location'
            })
          } else {
            return h.response({ status: 200 })
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
