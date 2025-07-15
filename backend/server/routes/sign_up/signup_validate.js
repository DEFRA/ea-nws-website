const {
  authCodeValidation
} = require('../../services/validations/AuthCodeValidation')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { logger } = require('../../plugins/logging')
const { GENERIC_ERROR_MSG } = require('../../constants/errorMessages')

module.exports = [
  {
    method: ['POST'],
    path: '/api/sign_up_validate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { registerToken, code } = request.payload
        const { error, code: formattedCode } = authCodeValidation(code)

        if (!error && registerToken) {
          const response = await apiCall(
            { registerToken: registerToken, code: formattedCode },
            'member/registerValidate'
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
