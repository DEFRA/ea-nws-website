const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { updateContact, checkKeyExists, setJsonData, addOrgActiveAdmins } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/organization/validate_invitation',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { inviteToken } = request.payload
        const { redis } = request.server.app

        if (inviteToken) {
          const response = await apiCall(
            { inviteToken: inviteToken },
            'organization/validateInvitation'
          )
          if (response?.data) {
            // contact has been validated so we need to set signup complete to true to allow login
            const contactToUpdate = JSON.parse(JSON.stringify(response.data.contact))

            const signupCompleteIndex = contactToUpdate.additionals.findIndex(additional => additional.id === 'signupComplete')
            const lastAcessedUrlIndex = contactToUpdate.additionals.findIndex(additional => additional.id === 'lastAccessedUrl')
            if (signupCompleteIndex !== -1) {
              contactToUpdate.additionals[signupCompleteIndex].value = {s: 'true'} 
            } else {
              contactToUpdate.additionals.push({id: 'signupComplete', value: { s: 'true' }})
            }
            if (lastAcessedUrlIndex !== -1) {
              contactToUpdate.additionals[lastAcessedUrlIndex].value = {s: '/organisation/sign-up/success'}
            } else {
              contactToUpdate.additionals.push({id: 'lastAccessedUrl', value :{ s: '/organisation/sign-up/success' }})
            }

            const updateResponse = await apiCall(
              { authToken: authToken, contact: contactToUpdate },
              'organization/updateContact'
            )

            if (updateResponse?.data?.contact) {
              const orgExists = await checkKeyExists(redis, response.data.organization.id + ':org_data')
              // if the org exists update the contact and set the profile and active admins
              // if not, org sign in will be called by the frontend to populate elasticache with the updated contact
              if (orgExists) {
                  await updateContact(redis, response.data.organization.id, updateResponse.data.contact)
                  await setJsonData(redis, updateResponse.data.contact.id + ':profile', profile)
                  await addOrgActiveAdmins(redis, response.data.organization.id, response.data.authToken)
              }
              return h.response({
                  status: 200,
                  data: {
                      profile: updateResponse.data.contact,
                      organization: response.data.organization,
                      authToken: response.data.authToken,
                      orgExists: orgExists
                  }
              })
            } else {
              return createGenericErrorResponse(h)
            } 
          } else {
            return createGenericErrorResponse(h)
          }
        } else {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
