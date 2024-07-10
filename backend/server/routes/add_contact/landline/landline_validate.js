const { apiCall } = require('../../../services/ApiService')
const {
  authCodeValidation
} = require('../../../services/validations/AuthCodeValidation')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/landline/validate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return h
            .response({ errorMessage: 'Oops, something happened!' })
            .code(400)
        }

        const { authToken, msisdn, code } = request.payload
        const errorValidation = authCodeValidation(code)

        if (!errorValidation && authToken && msisdn) {
          const response = await apiCall(
            msisdn,
            'member/verifyHomePhoneValidate'
          )
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
          .response({ errorMessage: 'Oops, something happened!' })
          .code(500)
      }
    }
  }
]
