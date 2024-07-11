const { apiCall } = require('../../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../../services/GenericErrorResponse')
const {
  phoneValidation
} = require('../../../services/validations/PhoneValidation')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/mobile/add',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          createGenericErrorResponse(h)
        }

        const { authToken, msisdn } = request.payload
        const error = phoneValidation(msisdn, 'mobile')

        if (!error && authToken) {
          const response = await apiCall(
            { authToken: authToken, msisdn: msisdn },
            'member/verifyMobilePhoneStart'
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
