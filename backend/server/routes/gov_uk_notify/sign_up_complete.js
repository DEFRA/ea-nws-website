const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { sendEmailNotification } = require('../../services/GovUkNotify')

module.exports = [
  {
    method: ['POST'],
    path: '/api/notify/sign_up',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { email, fullName } = request.payload
        if (email && fullName) {
          const personalisation = {
            full_name: fullName
          }

          sendEmailNotification(
            'c6120430-d51e-427e-9c06-7a82d5b6c832',
            email,
            personalisation
          )

          return h.response({ status: 200 })
        } else {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
