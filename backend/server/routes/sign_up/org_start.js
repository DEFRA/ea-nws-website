const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/org/sign_up_start',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { name } = request.payload

        if (name !== 'duplicateOrganisation') {
          return h.response({ status: 200 })
        } else {
          return h.response({
            status: 500,
            errorMessage: 'organisation already registered'
          })
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
