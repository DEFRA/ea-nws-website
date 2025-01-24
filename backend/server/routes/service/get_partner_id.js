const {
  getPartnerId
} = require('../../services/GetPartnerId')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/service/get_partner_id',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const response = await getPartnerId()
        return h.response(response)
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
