const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const {
  authCodeValidation
} = require('../../services/validations/AuthCodeValidation')
const { setJsonData } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/sign_in_validate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { signinToken, code, signinType } = request.payload
        const error = authCodeValidation(code)

        if (!error && signinToken) {
          const response = await apiCall(
            { signinToken: signinToken, code: code },
            'member/signinValidate'
          )
          if (signinType === 'org') {
            // Send the profile to elasticache
            console.log('Setting elasticache')
            await setJsonData(response.data.authToken, { profile: response.data.profile })
          }
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
