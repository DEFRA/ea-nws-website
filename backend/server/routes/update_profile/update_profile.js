const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { convertWebProfile } = require('../../services/formatters/profileFormatter')

module.exports = [
  {
    method: ['POST'],
    path: '/api/profile/update',

    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        let { authToken, profile } = request.payload
        profile = convertWebProfile(profile)
        console.log(profile)

        if (Object.keys(profile).length !== 0 && authToken) {
          const response = await apiCall(
            { authToken: authToken, profile: profile },
            'member/updateProfile'
          )
          return h.response(response)
        } else {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
