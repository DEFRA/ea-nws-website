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
          createGenericErrorResponse(h)
        }

        const { profile } = request.payload

        if (Object.keys(profile).length !== 0) {
          const response = await apiCall(
            request.payload,
            'member/updateProfile'
          )
          return h.response(response)
        } else {
          createGenericErrorResponse(h)
        }
      } catch (error) {
        createGenericErrorResponse(h)
      }
    }
  }
]
