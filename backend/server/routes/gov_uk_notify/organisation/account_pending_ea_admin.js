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
          , professionalPartner, fullName, alternativeContactFullName,
          alternativeContactEmail, alternativeContactTelephone,
          alternativeContactJob, submissionDateTime
        } = request.payload

        if (
          email && refNumber && orgName && address && companyHouseNumber &&
                    professionalPartner && fullName && alternativeContactFullName &&
                    alternativeContactEmail && alternativeContactTelephone &&
                    alternativeContactJob && submissionDateTime
        ) {
          const personalisation = {
            email_address: email,  
            full_name: fullName,  
            reference_number: refNumber,  
            organisation_name: orgName,  
            head_office_address: address,  
            companies_house_number: companyHouseNumber,  
            professional_partner: professionalPartner,  
            alternative_contact_full_name: alternativeContactFullName,  
            alternative_contact_email: alternativeContactEmail,  
            alternative_contact_telephone_number: alternativeContactTelephone,  
            alternative_contact_job_title: alternativeContactJob,  
            submission_date_time: submissionDateTime  
          };
          
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
