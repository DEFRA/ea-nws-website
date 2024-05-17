const { apiCall } = require('../../services/ApiService')

module.exports = [
  {
    method: ['POST'],
    path: '/profile/update',

    handler: async (request, h) => {
      const response = await apiCall(request.payload, 'member/updateprofile')
      return h.response(response)
    }
  }
]
