const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { searchLocations } = require('../../services/elasticache')

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

        if (location && authToken) {

          //check location is not duplicate
          const duplicate = await searchLocations(authToken, 'name', locationName)
          if (duplicate.length !== 0) {
            return h.response({ status: 200, errorMessage: 'duplicate location' })
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