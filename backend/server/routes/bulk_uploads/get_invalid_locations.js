const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { listInvLocations } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/bulk_uploads/get_invalid_locations',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { orgId } = request.payload
        const { redis } = request.server.app

        if (orgId) {
          const result = await listInvLocations(redis, orgId)
          if (result) {
            return h.response({ status: 200, data: result })
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
