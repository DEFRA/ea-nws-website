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
            email: email,  
            full_name: fullName,  
            ref_number: refNumber,  
            org_name: orgName,  
            address: address,  
            company_house_number: companyHouseNumber,  
            professional_partner: professionalPartner,  
            alternative_contact_full_name: alternativeContactFullName,  
            alternative_contact_email: alternativeContactEmail,  
            alternative_contact_telephone: alternativeContactTelephone,  
            alternative_contact_job: alternativeContactJob,  
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
