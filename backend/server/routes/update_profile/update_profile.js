const { apiCall } = require('../../services/ApiService')

module.exports = [
  {
    method: ['POST'],
    path: '/profile/update',

    handler: async (request, h) => {
      console.log('payload', request.payload)
      const { authToken, profile } = request.payload

      const response = await apiCall(request.payload, 'member/updateprofile')
      console.log('response', response)

      return h.response(profile)
    }
  }
]
