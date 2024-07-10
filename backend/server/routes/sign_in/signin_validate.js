const { apiCall } = require('../../services/ApiService')
const {
  authCodeValidation
} = require('../../services/validations/AuthCodeValidation')

module.exports = [
  {
    method: ['POST'],
    path: '/api/signInValidate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return h
            .response({ errorMessage: 'Oops, something happened!' })
            .code(400)
        }

        const { signinToken, code } = request.payload
        const errorValidation = authCodeValidation(code)

        if (!errorValidation && signinToken) {
          const response = await apiCall(email, 'member/signinValidate')
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
