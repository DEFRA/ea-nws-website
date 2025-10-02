const {
  getServicePhase
} = require('../../services/GetServicePhase')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/service/get_service_phase',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const response = await getServicePhase()
        return h.response(response)
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
