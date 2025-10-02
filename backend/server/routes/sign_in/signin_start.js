const { apiCall } = require('../../services/ApiService')
const {
  emailValidation
} = require('../../services/validations/EmailValidation')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { logger } = require('../../plugins/logging')

module.exports = [
  {
    method: ['POST'],
    path: '/api/sign_in',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { email } = request.payload
        const error = emailValidation(email)

        if (!error) {
          const response = await apiCall({ email: email }, 'member/signinStart')
          return h.response(response)
        } else {
          return h.response({
            status: 500,
            errorMessage: error
          })
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
