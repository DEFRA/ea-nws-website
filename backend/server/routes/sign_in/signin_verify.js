const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { logger } = require('../../plugins/logging')

console.log('sign_in_verify route loaded')

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
              errorMessage: !error ? 'Oops, something happened!' : error
            })
          }
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
