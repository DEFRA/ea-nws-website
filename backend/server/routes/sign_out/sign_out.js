const { deleteJsonData } = require('../../services/elasticache')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/sign_out',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { profileId, orgId } = request.payload
        if (profileId && orgId) {
          await deleteJsonData(profileId+':profile')
          await deleteJsonData(orgId+':org_data')
          return h.response({
            status: 200
          })
        } else {
          return createGenericErrorResponse(h)
        }
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
