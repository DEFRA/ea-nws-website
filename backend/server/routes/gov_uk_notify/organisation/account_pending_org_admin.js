const getSecretKeyValue = require('../../../services/SecretsManager')
const {
  createGenericErrorResponse
} = require('../../../services/GenericErrorResponse')
const { sendEmailNotification } = require('../../../services/GovUkNotify')

module.exports = [
  {
    method: ['POST'],
    path: '/api/notify/account_pending_org',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const {
          email,
          orgName,
          address,
          companyHouseNumber,
          responder,
          fullName,
          alternativeContactFullName,
          alternativeContactEmail,
          alternativeContactTelephone,
          alternativeContactJob,
          eaEmail
        } = request.payload

        if (
          email &&
          orgName &&
          address &&
          companyHouseNumber &&
          responder &&
          fullName &&
          alternativeContactFullName &&
          alternativeContactEmail &&
          alternativeContactTelephone &&
          alternativeContactJob &&
          eaEmail
        ) {
          const personalisation = {
            email_address: email,
            full_name: fullName,
            organisation_name: orgName,
            head_office_address: address,
            companies_house_number: companyHouseNumber,
            responder: responder,
            alternative_contact_full_name: alternativeContactFullName,
            alternative_contact_email: alternativeContactEmail,
            alternative_contact_telephone_number: alternativeContactTelephone,
            alternative_contact_job_title: alternativeContactJob,
            ea_email: eaEmail
          }

          const templateId = await getSecretKeyValue(
            'nws/notify/templates',
            'accountPendingOrgAdmin'
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
