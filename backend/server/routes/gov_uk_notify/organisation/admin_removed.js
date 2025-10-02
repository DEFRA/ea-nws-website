const {
  createGenericErrorResponse
} = require('../../../services/GenericErrorResponse')
const { sendEmailNotification } = require('../../../services/GovUkNotify')
const getSecretKeyValue = require('../../../services/SecretsManager')

module.exports = [
  {
    method: ['POST'],
    path: '/api/notify/admin_removed',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { email, name, adminName, adminEmail } = request.payload

        if (email && name && adminName && adminEmail) {
          const personalisation = {
            name: name,
            admin_name: adminName,
            admin_email: adminEmail
          }

          const templateId = await getSecretKeyValue(
            'nws/notify/templates',
            'adminRemoved'
          )

          await sendEmailNotification(templateId, email, personalisation)
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
