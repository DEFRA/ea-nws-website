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
        const error = authCodeValidation(code)

        if (!error && registerToken) {
          const response = await apiCall(
            { registerToken: registerToken, code: code },
            'member/registerValidate'
          )
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
          .response({ errorMessage: 'Oops, something happened!' })
          .code(500)
      }
    }
  }
]
