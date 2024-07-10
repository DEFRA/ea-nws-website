const {
  authCodeValidation
} = require('../../services/validations/AuthCodeValidation')
const { apiCall } = require('../../services/ApiService')

module.exports = [
  {
    method: ['POST'],
    path: '/api/signupValidate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return h
            .response({ errorMessage: 'Oops, something happened!' })
            .code(400)
        }

        const { registerToken, code } = request.payload
        const codeValidation = authCodeValidation(code)

        if (!codeValidation && registerToken) {
          const response = await apiCall(data, 'member/registerValidate')
          return h.response(response)
        } else {
          return h
            .response({
              errorMessage: codeValidation
                ? codeValidation
                : 'Oops, something happened!'
            })
            .code(500)
        }
      } catch (error) {
        return h
          .response({ errorMessage: 'Oops, something happened!' })
          .code(500)
      }
    }
  }
]
