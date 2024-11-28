const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const {
  searchLocations,
  searchInvLocations
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
        const { authToken, type, path, value } = request.payload

        if (path && value && authToken) {
          const result =
            type === 'valid'
              ? await searchLocations(authToken, path, value)
              : await searchInvLocations(authToken, path, value)
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
