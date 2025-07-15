const { apiCall } = require('../../../services/ApiService')
const {
  authCodeValidation
} = require('../../../services/validations/AuthCodeValidation')
const {
  createGenericErrorResponse
} = require('../../../services/GenericErrorResponse')
const { logger } = require('../../../plugins/logging')
const { GENERIC_ERROR_MSG } = require('../../../constants/errorMessages')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/mobile/validate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, msisdn, code } = request.payload
        const { error, code: formattedCode } = authCodeValidation(code)

        if (!error && authToken) {
          const response = await apiCall(
            { authToken: authToken, msisdn: msisdn, code: formattedCode },
            'member/verifyMobilePhoneValidate'
          )
          return h.response(response)
        } else {
          return h.response({
            status: 500,
            errorMessage: !error ? GENERIC_ERROR_MSG : error
          })
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
