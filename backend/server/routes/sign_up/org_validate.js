const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { apiCall } = require('../../services/ApiService')
const { authCodeValidation } = require('../../services/validations/AuthCodeValidation')
const { setJsonData } = require('../../services/elasticache')

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
        const error = authCodeValidation(code)

        if (!error && orgRegisterToken) {
          const response = await apiCall(
            { orgRegisterToken: orgRegisterToken, code: code },
            'organization/registerValidate'
          )
          await setJsonData(response.data.organization.id + ':org_data', response.data.organization)
          return h.response(response)
        } else {
          return h.response({
            status: 500,
            errorMessage: !error ? 'Oops, something happened!' : error
          })
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
