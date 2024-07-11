const { osPostCodeApiCall } = require('../../services/OrdnanceSurveyApiService')

module.exports = [
  {
    method: ['POST'],
    path: '/api/os-api/postcode-search',
    handler: async (request, h) => {
      try {
        const { postCode } = request.payload
        console.log('postcode', postCode)
        const response = await osPostCodeApiCall(postCode)
        return h.response(response)
      } catch (error) {
        return h.response({
          status: 500,
          errorMessage: 'Oops, something happened!'
        })
      }
    }
  }
]
