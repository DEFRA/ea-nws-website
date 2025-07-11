const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const {
  setJsonData,
  updateContact,
  getJsonData
} = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/profile/update',

    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { authToken, profile, signinType } = request.payload
        const { redis } = request.server.app
        const sessionData = await getJsonData(redis, authToken)

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
          if (sessionData?.orgId) {
            await updateContact(redis, sessionData.orgId, response.data.profile)
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
