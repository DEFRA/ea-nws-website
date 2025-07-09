const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const {
  authCodeValidation
} = require('../../services/validations/AuthCodeValidation')
const { logger } = require('../../plugins/logging')
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

        const { redis } = request.server.app
        const { signinToken, code } = request.payload
        const { error, code: formattedCode } = authCodeValidation(code)

        if (!error && signinToken) {
          const response = await apiCall(
            { signinToken: signinToken, code: formattedCode },
            'member/signinValidate'
          )

          if (response.data.organization) {
            const signupComplete = response.data.profile.additionals?.find(
              (additional) => additional.id === 'signupComplete'
            )

            if (signupComplete?.value?.s === 'pending') {
              return h.response({
                status: 500,
                errorMessage: 'account pending'
              })
            }

            // store the organisation ID serverside
            await setJsonData(
              redis,
              response.data.authToken,
              response.data.organization.id
            )
          }
          return h.response(response)
        } else {
          return h.response({
            status: 500,
            errorMessage: !error ? 'Oops, something happened!' : error
          })
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
