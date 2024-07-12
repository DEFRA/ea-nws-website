const { apiCall } = require('../../../services/ApiService')
const {
  phoneValidation
} = require('../../../services/validations/PhoneValidation')
const {
  createGenericErrorResponse
} = require('../../../services/GenericErrorResponse')
const {
  normalisePhoneNumber
} = require('../../../services/formatters/NormalisePhoneNumber')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/landline/add',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, msisdn } = request.payload
        const error = phoneValidation(msisdn, 'mobileAndLandline')

        if (!error && authToken) {
          // ensure all phone numbers are formatted the same
          const normalisedPhoneNumber = normalisePhoneNumber(msisdn)
          const response = await apiCall(
            { authToken: authToken, msisdn: normalisedPhoneNumber },
            'member/verifyHomePhoneStart'
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
