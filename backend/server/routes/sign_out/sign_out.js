const { deleteJsonData } = require('../../services/elasticache')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/sign_out',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { authToken } = request.payload
        if (authToken) {
          await deleteJsonData(authToken)
          return h.response({
            status: 200
          })
        } else {
          return createGenericErrorResponse(h)
        }
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
