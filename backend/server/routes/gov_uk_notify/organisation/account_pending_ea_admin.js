const getSecretKeyValue = require('../../../services/SecretsManager')
const {
  createGenericErrorResponse
} = require('../../../services/GenericErrorResponse')
const { sendEmailNotification } = require('../../../services/GovUkNotify')

module.exports = [
  {
    method: ['POST'],
    path: '/api/notify/account_pending_ea',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const {
          email: eaEmail,
          adminEmail,
          orgName,
          address,
          companyHouseNumber,
          responder,
          fullName,
          alternativeContactFullName,
          alternativeContactEmail,
          alternativeContactTelephone,
          alternativeContactJob,
          submissionDateTime,
          authToken
        } = request.payload

        const { redis } = request.server.app
        const sessionData = await getJsonData(redis, authToken)

        if (
          eaEmail &&
          adminEmail &&
          sessionData.orgId &&
          orgName &&
          address &&
          companyHouseNumber &&
          responder &&
          fullName &&
          alternativeContactFullName &&
          alternativeContactEmail &&
          alternativeContactTelephone &&
          alternativeContactJob &&
          submissionDateTime
        ) {
          const personalisation = {
            email_address: adminEmail,
            full_name: fullName,
            reference_number: sessionData.orgId,
            organisation_name: orgName,
            head_office_address: address,
            companies_house_number: companyHouseNumber,
            responder: responder,
            alternative_contact_full_name: alternativeContactFullName,
            alternative_contact_email: alternativeContactEmail,
            alternative_contact_telephone_number: alternativeContactTelephone,
            alternative_contact_job_title: alternativeContactJob,
            submission_date_time: submissionDateTime
          }

          const templateId = await getSecretKeyValue(
            'nws/notify/templates',
            'accountPendingEaAdmin'
          )

          sendEmailNotification(templateId, eaEmail, personalisation)
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
