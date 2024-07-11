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
        const error = authCodeValidation(code)

        if (!error && signinToken) {
          const response = await apiCall(
            { signinToken: signinToken, code: code },
            'member/signinValidate'
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
          .response({
            errorMessage: 'Oops, something happened!'
          })
          .code(500)
      }
    }
  }
]
