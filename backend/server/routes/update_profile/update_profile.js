const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/profile/update',

    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, profile } = request.payload

        if (Object.keys(profile).length !== 0 && authToken) {
          const response = await apiCall(
            { authToken: authToken, profile: profile },
            'member/updateProfile'
          )
          return h.response(response)
        } else {
          createGenericErrorResponse(h)
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
