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
        const errorValidation = emailValidation(email)

        if (!errorValidation && authToken) {
          const response = await apiCall(email, 'member/verifyEmailStart')
          return h.response(response)
        } else {
          return h
            .response({
              errorMessage: errorValidation
                ? errorValidation
                : 'Oops, something happened!'
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
