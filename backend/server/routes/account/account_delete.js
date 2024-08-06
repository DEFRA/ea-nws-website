const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/account/delete',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        request.log('info', ['***ACCOUNT DELETED***', request.payload])

        return h.response({ status: 200 })
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
