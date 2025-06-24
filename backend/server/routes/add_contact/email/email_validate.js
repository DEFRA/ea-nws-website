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

        if (!error && authToken) {
          const response = await apiCall(
            { authToken: authToken, email: email, code: formattedCode },
            'member/verifyEmailValidate'
          )
          return h.response(response)
        } else {
          return h.response({
            status: 500,
            errorMessage: !error ? 'Oops, something happened!' : error
          })
        }
      } catch (error) {
        logger.error(error)

        // Check the specific GeoSafe error
        if (
          error?.response?.status === 500 &&
          error?.response?.errorMessage?.includes('already registered')
        ) {
          return h.response({
            status: 400,
            errorMessage: 'The email address you entered is already being used'
          })
        }

        // Generic error
        return createGenericErrorResponse(h)
      }
    }
  }
]
