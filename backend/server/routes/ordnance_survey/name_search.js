const {
  osFindNameApiCall,
  osFindApiCall
} = require('../../services/OrdnanceSurveyApiService')
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

        const { name, filter } = request.payload

        const response = await osFindNameApiCall(name, filter)
        return h.response(response)
      } catch {
        return createGenericErrorResponse(h)
      }
    }
  },
  {
    method: ['POST'],
    path: '/api/os-api/name-minmatch-search',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { name, minmatch } = request.payload
        const response = await osFindApiCall(name, minmatch)
        return h.response(response)
      } catch {
        return createGenericErrorResponse(h)
      }
    }
  }
]
