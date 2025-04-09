const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { updateContact, checkKeyExists, setJsonData, addOrgActiveAdmins } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/organization/demote_contact',
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
          if (response.data) {
            const orgExists = await checkKeyExists(redis, response.data.organization.id + ':org_data')
            // if the org exists update the contact and set the profile and active admins
            // if not, org sign in will be called by the frontend to populate elasticache with the updated contact
            if (orgExists) {
                await updateContact(redis, orgId, response.data.contact)
                await setJsonData(redis, response.data.contact.id + ':profile', profile)
                await addOrgActiveAdmins(redis, response.data.organization.id, authToken)
            }
            return h.response({
                status: 200,
                data: {
                    profile: response.data.contact,
                    organization: organization,
                    authToken: authToken,
                    orgExists: orgExists
                }
            })
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
