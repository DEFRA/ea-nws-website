const {
  getEAEmail
} = require('../../services/GetEAEmail')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/service/get_ea_email',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const response = await getEAEmail()
        return h.response(response)
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
