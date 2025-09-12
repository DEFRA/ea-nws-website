const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { logger } = require('../../plugins/logging')

module.exports = [
  {
    method: ['POST'],
    path: '/api/sign_in_verify',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { authToken } = request.payload

        if (authToken) {
          const response = await apiCall(
            { authToken: authToken },
            'member/signinVerify'
          )

          if (response.data) {
            return h.response(response)
          } else {
            return h.response({
              status: 500,
              errorMessage: !response.errorMessage ? 'Oops, something happened!' : response.errorMessage
            })
          }
        } else {
          return h.response({
            status: 500,
            errorMessage: 'Oops, something happened!'
          })
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
