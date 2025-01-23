const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { removeInvLocation } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/bulk_uploads/remove_invalid_location',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { orgId, locationId } = request.payload

        if (orgId && locationId) {
          const result = await removeInvLocation(orgId, locationId)
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
