const { getWfsData } = require('../../services/WfsData')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/wfs',
    handler: async (request, h) => {
      try {
        const response = await getWfsData(request.payload)
        return h.response(response)
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
