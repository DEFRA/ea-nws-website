const { apiCall } = require('../../../services/ApiService')
const {
  authCodeValidation
} = require('../../../services/validations/AuthCodeValidation')
const {
  createGenericErrorResponse
} = require('../../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/landline/validate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, code } = request.payload
        const error = authCodeValidation(code)

        if (!error && authToken) {
          const response = await apiCall(
            { authToken: authToken, code: code },
            'member/verifyHomePhoneValidate'
          )
          return h.response(response)
        } else {
          return h.response({
            status: 500,
            errorMessage: !error ? 'Oops, something happened!' : error
          })
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
