const { osPostCodeApiCall } = require('../../services/OrdnanceSurveyApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/os-api/postcode-search',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { postCode } = request.payload

        const response = await osPostCodeApiCall(postCode)
        return h.response(response)
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
