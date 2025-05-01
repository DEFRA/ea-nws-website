const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { getJsonData, getOrgActiveAdmins } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/elasticache/get_active_admins',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { orgId, userId } = request.payload
        const { redis } = request.server.app

        if (orgId) {
          let result
          const activeAdmins = await getOrgActiveAdmins(redis, orgId)
          if (userId) {
            result = activeAdmins.includes(userId)
          } else {
            result = activeAdmins
          }
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
