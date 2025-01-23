const { logger } = require('../../../plugins/logging')
const { apiCall } = require('../../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../../services/GenericErrorResponse')
const {
  emailValidation
} = require('../../../services/validations/EmailValidation')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/email/add',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, email } = request.payload
        const error = emailValidation(email)

        if (!error && authToken) {
          const response = await apiCall(
            { authToken: authToken, email: email },
            'member/verifyEmailStart'
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
        return createGenericErrorResponse(h)
      }
    }
  }
]
