const { apiCall } = require('../../../services/ApiService')
const {
  authCodeValidation
} = require('../../../services/validations/AuthCodeValidation')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/mobile/validate',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { code } = request.payload
        // progressive enhancement validation
        const validationError = authCodeValidation(code)

        if (validationError === '') {
          // request.payload = { authToken, msisdn, code }
          const response = await apiCall(
            request.payload,
            'member/verifyMobilePhoneValidate'
          )
          return h.response(response)
        } else {
          return h.response({ status: 500, errorMessage: validationError })
        }
      } catch (error) {
        return h.response({
          status: 500,
          errorMessage: 'Oops, something happened!'
        })
      }
    }
  }
]
