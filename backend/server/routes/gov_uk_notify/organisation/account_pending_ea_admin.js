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
          email, refNumber, orgName, address, companyHouseNumber
          , professionalPartner, fullName, alternavtiveContactFullName,
          alternavtiveContactEmail, alternavtiveContactTelephone,
          alternavtiveContactJob, submissionDateTime
        } = request.payload

        if (
          email && refNumber && orgName && address && companyHouseNumber &&
                    professionalPartner && fullName && alternavtiveContactFullName &&
                    alternavtiveContactEmail && alternavtiveContactTelephone &&
                    alternavtiveContactJob && submissionDateTime
        ) {
          const personalisation = {
            full_name: fullName,
            ref_number: refNumber,
            org_name: orgName,
            address: address,
            company_house_number: companyHouseNumber,
            professional_Partner: professionalPartner,
            email: email,
            alternavtive_contact_full_name: alternavtiveContactFullName,
            alternavtive_contact_email: alternavtiveContactEmail,
            alternavtive_contact_telephone: alternavtiveContactTelephone,
            alternavtive_contact_job: alternavtiveContactJob,
            submission_date_time: submissionDateTime
          }
          const templateId = await getSecretKeyValue(
            'nws/notify/templates',
            'accountPendingEaAdmin'
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
