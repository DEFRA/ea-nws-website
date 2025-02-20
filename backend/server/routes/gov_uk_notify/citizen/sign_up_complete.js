const getSecretKeyValue = require('../../../services/SecretsManager')
const {
  createGenericErrorResponse
} = require('../../../services/GenericErrorResponse')
const { sendEmailNotification } = require('../../../services/GovUkNotify')

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
          const templateId = await getSecretKeyValue(
            'nws/notify/templates',
            'signUpComplete'
          )

          sendEmailNotification(templateId, email, personalisation)

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
