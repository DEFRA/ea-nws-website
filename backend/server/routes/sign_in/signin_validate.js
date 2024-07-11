const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const {
  authCodeValidation
} = require('../../services/validations/AuthCodeValidation')

module.exports = [
  {
    method: ['POST'],
    path: '/api/sign_in_validate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          createGenericErrorResponse(h)
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
          return h.response({
            status: 500,
            errorMessage: !error ? 'Oops, something happened!' : error
          })
        }
      } catch (error) {
        createGenericErrorResponse(h)
      }
    }
  }
]
