const { apiCall } = require('../../../services/ApiService')
const {
  emailValidation
} = require('../../../services/validations/EmailValidation')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/email/add',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return h
            .response({ errorMessage: 'Oops, something happened!' })
            .code(400)
        }

        const { authToken, email } = request.payload
        const error = emailValidation(email)

        if (!error && authToken) {
          const response = await apiCall(email, 'member/verifyEmailStart')
          return h.response(response)
        } else {
          return h
            .response({
              errorMessage: !error ? 'Oops, something happened!' : error
            })
            .code(500)
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
