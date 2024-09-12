const { osOAuth2ApiCall } = require('../../services/OrdnanceSurveyApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/os-api/oauth2',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const response = await osOAuth2ApiCall()
        return h.response(response)
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
