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

        const { name, email } = request.payload
        if (name && email) {
          const response = await apiCall(
            {
              name: name,
              email: email
            },
            'organization/registerStart'
          )
          return h.response(response)
        } else {
          return h.response({
            status: 500,
            errorMessage: 'Organisation name is empty'
          })
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
