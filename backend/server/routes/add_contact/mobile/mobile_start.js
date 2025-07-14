const { apiCall } = require('../../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../../services/GenericErrorResponse')
const {
  phoneValidation
} = require('../../../services/validations/PhoneValidation')
const {
  normalisePhoneNumber
} = require('../../../services/formatters/NormalisePhoneNumber')
const { logger } = require('../../../plugins/logging')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/mobile/add',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, msisdn } = request.payload
        const error = phoneValidation(msisdn, 'mobile')

        if (!error && authToken) {
          // ensure all phone numbers are formatted the same
          const normalisedPhoneNumber = normalisePhoneNumber(msisdn)
          const response = await apiCall(
            { authToken: authToken, msisdn: normalisedPhoneNumber },
            'member/verifyMobilePhoneStart'
          )
          return h.response(response)
        } else {
          return h.response({
            status: 500,
            errorMessage: !error
              ? 'The system encountered an unexpected error'
              : error
          })
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
