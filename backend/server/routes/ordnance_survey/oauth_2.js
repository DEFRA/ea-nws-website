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
        const response = await osOAuth2ApiCall()
        return h.response(response)
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
