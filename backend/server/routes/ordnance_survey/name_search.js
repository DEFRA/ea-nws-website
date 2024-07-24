const { osFindNameApiCall } = require('../../services/OrdnanceSurveyApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/os-api/name-search',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { postCode } = request.payload
        const response = await osFindNameApiCall(postCode)
        return h.response(response)
      } catch {
        return createGenericErrorResponse(h)
      }
    }
  }
]
