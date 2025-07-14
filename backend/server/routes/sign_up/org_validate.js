const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { apiCall } = require('../../services/ApiService')
const {
  authCodeValidation
} = require('../../services/validations/AuthCodeValidation')
const { setJsonData } = require('../../services/elasticache')
const { logger } = require('../../plugins/logging')

module.exports = [
  {
    method: ['POST'],
    path: '/api/org/sign_up_validate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { code, orgRegisterToken } = request.payload
        const { redis } = request.server.app
        const { error, code: formattedCode } = authCodeValidation(code)

        if (!error && orgRegisterToken) {
          const response = await apiCall(
            { orgRegisterToken: orgRegisterToken, code: formattedCode },
            'organization/registerValidate'
          )
          await setJsonData(redis, response.data.organization.id + ':org_data', response.data.organization)
          return h.response(response)
        } else {
          return h.response({
            status: 500,
            errorMessage: !error
              ? 'The system encountered an unexpected error'
              : error
          })
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
