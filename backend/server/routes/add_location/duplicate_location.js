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
        const { orgId, locationName } = request.payload

        if (locationName && orgId) {
          const duplicate = await searchLocations(orgId, 'meta_data.location_additional.location_name', locationName)
          if (duplicate.length !== 0) {
            return h.response({ status: 500, errorMessage: 'duplicate location' })
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
