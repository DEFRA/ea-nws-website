const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { listLocations } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/elasticache/list_locations',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { orgId } = request.payload

        if (orgId) {
          const result = await listLocations(orgId)
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
