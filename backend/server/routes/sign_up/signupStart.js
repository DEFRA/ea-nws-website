const {
  emailValidation
} = require('../../services/validations/EmailValidation')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/sign_up_start',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          createGenericErrorResponse(h)
        }

        const { email } = request.payload
        const errorValidation = emailValidation(email)

        if (!errorValidation) {
          const response = await apiCall(email, 'member/registerStart')
          return h.response(response)
        } else {
          return h.response({ status: 500, errorMessage: errorValidation })
        }
      } catch (error) {
        createGenericErrorResponse(h)
      }
    }
  }
]
