const { apiCall } = require('../../services/ApiService')

module.exports = [
  {
    method: ['POST'],
    path: '/api/partner/register',

    handler: async (request, h) => {
      try {
        const { authToken, partnerId, params } = request.payload

        if (authToken || partnerId || Object.keys(params).length !== 0) {
          const response = await apiCall(
            request.payload,
            'member/registerToPartner'
          )
          return h.response(response)
        } else {
          return h.response({ status: 400 })
        }
      } catch (error) {
        return h.response({
          status: 500,
          errorMessage: 'Oops, something happened!'
        })
      }
    }
  }
]
