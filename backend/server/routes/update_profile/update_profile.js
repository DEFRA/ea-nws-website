const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { setJsonData, updateContact } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/profile/update',

    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { authToken, profile, signinType, orgId } = request.payload
        const { redis } = request.server.app

        if (Object.keys(profile).length !== 0 && authToken) {
          const response = await apiCall(
            { authToken: authToken, profile: profile },
            'member/updateProfile'
          )
          if (signinType === 'org') {
            await setJsonData(
              redis,
              response.data.profile.id + ':profile',
              response.data.profile
            )
          }
          if (orgId) {
            await updateContact(redis, orgId, response.data.profile)
          }
          return h.response(response)
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
