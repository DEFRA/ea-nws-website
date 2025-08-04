const {
  GENERIC_ERROR_MSG,
  GENERIC_OTP_ERROR_MSG
} = require('../../../constants/errorMessages')
const { logger } = require('../../../plugins/logging')
const { apiCall } = require('../../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../../services/GenericErrorResponse')
const {
  authCodeValidation
} = require('../../../services/validations/AuthCodeValidation')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/email/validate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, email, code } = request.payload
        const { error, code: formattedCode } = authCodeValidation(code)

        if (error || !authToken) {
          return h.response({
            status: 500,
            errorMessage: !error ? GENERIC_ERROR_MSG : error
          })
        }

        const response = await apiCall(
          { authToken: authToken, email: email, code: formattedCode },
          'member/verifyEmailValidate'
        )

        // Check the specific GeoSafe error
        if (
          response.status === 500 &&
          response.errorMessage?.includes('already registered')
        ) {
          return h.response({
            status: 400,
            errorMessage: 'The email address you entered is already being used'
          })
        } else if (
          response.status === 500 &&
          response.errorMessage?.includes('expired')
        ) {
          return h.response({
            status: 400,
            errorMessage:
              'The code you have entered has expired - please request a new code'
          })
        }

        // Any other error gets generic message
        if (response.status !== 200) {
          return h.response({
            status: response.status,
            errorMessage: GENERIC_OTP_ERROR_MSG
          })
        }

        // Success
        return h.response(response)
      } catch (error) {
        logger.error(error)

        // Generic error
        return createGenericErrorResponse(h)
      }
    }
  }
]
