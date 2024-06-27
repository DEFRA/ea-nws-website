const { apiCall } = require('../../../services/ApiService')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/name/add',
    handler: async (request, h) => {
      console.log(request.payload)
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }

        const response = await apiCall(
          request.payload,
          'member/verifyFullNameStart'
        )
        return h.response(response)
      } catch (error) {
        return h.response({
          status: 500,
          errorMessage: 'Oops, something happened!'
        })
      }
    }
  }
]
