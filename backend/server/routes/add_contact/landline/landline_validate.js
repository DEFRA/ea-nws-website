const { apiCall } = require('../../../services/ApiService')
const {
  authCodeValidation
} = require('../../../services/validations/AuthCodeValidation')
const {
  createGenericErrorResponse
} = require('../../../services/GenericErrorResponse')
const { logger } = require('../../../plugins/logging')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/landline/validate',
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
            'member/verifyHomePhoneValidate'
          )
          return h.response(response)
        } else if (
          response.status === 500 &&
          response.errorMessage?.includes('expired')
        ) {
          return h.response({
            status: 400,
            errorMessage:
              'The code you have entered has expired - please request a new code'
          })
        } else {
          // Generic message
          return h.response({
            status: 500,
            errorMessage: !error
              ? 'Code not recognised - try again or request a new code'
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
