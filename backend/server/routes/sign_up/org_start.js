const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { apiCall } = require('../../services/ApiService')

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
        if (name != null) {
          const response = await apiCall(
            { name: name },
            'member/registerOrgStart'
          )
          return h.response(response)
        } else {
          return h.response({
            status: 500,
            errorMessage: 'Organisation name is null'
          })
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
