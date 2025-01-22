const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { setJsonData } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/organization/update',

    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { authToken, organization } = request.payload

        if (Object.keys(organization).length !== 0 && authToken) {
          const response = await apiCall(
            { authToken: authToken, organization: organization },
            'organization/update'
          )
          await setJsonData(response.data.organization.id + ':org_data', response.data.organization)
          return h.response(response)
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
