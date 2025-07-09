const { logger } = require('../../plugins/logging')
const { orgSignOut } = require('../../services/elasticache')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/sign_out',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { profileId, authToken } = request.payload
        const { redis } = request.server.app

        if (profileId) {
          await orgSignOut(redis, profileId, authToken)
          return h.response({
            status: 200
          })
        } else {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        logger.error(error)
        createGenericErrorResponse(h)
      }
    }
  }
]
