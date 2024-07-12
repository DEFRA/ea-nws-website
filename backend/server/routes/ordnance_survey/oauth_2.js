const { oAuth2ApiCall } = require('../../services/OrdnanceSurveyApiService')

module.exports = [
  {
    method: ['POST'],
    path: '/api/os-api/oauth2',
    handler: async (request, h) => {
      try {
        const response = await oAuth2ApiCall()
        return h.response(response)
      } catch (error) {
        return h.response({
          status: 500,
          errorMessage: 'Oops, something happened!'
        })
      }
    }
  }
]
