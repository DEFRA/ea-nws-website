const { apiCall } = require('../../../services/ApiService')
const {
  phoneValidation
} = require('../../../services/validations/PhoneValidation')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/mobile/add',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { msisdn } = request.payload
        const validationError = phoneValidation(msisdn, 'mobile')

        if (validationError === '') {
          // request.payload = { authToken, msisdn }
          const response = await apiCall(
            request.payload,
            'member/verifyMobilePhoneStart'
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
