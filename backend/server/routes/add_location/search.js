const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const {
  findLocationByName,
  findInvLocationByName
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
        const { orgId, locationName, type } = request.payload

        if (path && value && authToken) {
          const result =
            type === 'valid'
              ? await findLocationByName(orgId, locationName)
              : await findInvLocationByName(orgId, locationName)
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
