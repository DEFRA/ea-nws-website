const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { findLocationByName } = require('../../services/elasticache')

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
          const duplicate = await findLocationByName(orgId, locationName)
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
