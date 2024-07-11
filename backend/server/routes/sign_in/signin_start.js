const { apiCall } = require('../../services/ApiService')
const {
  emailValidation
} = require('../../services/validations/EmailValidation')

module.exports = [
  {
    method: ['POST'],
    path: '/api/signInStart',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return h
            .response({ errorMessage: 'Oops, something happened!' })
            .code(400)
        }

        const { email } = request.payload
        const error = emailValidation(email)

        if (!error) {
          const response = await apiCall(email, 'member/signinStart')
          return h.response(response)
        } else {
          return h.response({ errorMessage: error }).code(500)
        }
      } catch (error) {
        return h
          .response({ errorMessage: 'Oops, something happened!' })
          .code(500)
      }
    }
  }
]
