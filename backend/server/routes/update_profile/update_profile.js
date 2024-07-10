const { apiCall } = require('../../services/ApiService')

module.exports = [
  {
    method: ['POST'],
    path: '/api/profile/update',

    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return h
            .response({ errorMessage: 'Oops, something happened!' })
            .code(400)
        }

        const { profile } = request.payload

        if (Object.keys(profile).length !== 0) {
          const response = await apiCall(
            request.payload,
            'member/updateProfile'
          )
          return h.response(response)
        } else {
          return h.response().code(400)
        }
      } catch (error) {
        return h
          .response({
            errorMessage: 'Oops, something happened!'
          })
          .code(500)
      }
    }
  }
]
