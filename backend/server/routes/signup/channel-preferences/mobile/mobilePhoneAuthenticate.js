const { apiCall } = require('../../../../services/ApiService')

module.exports = [
  {
    method: ['POST', 'PUT'],
    path: '/signup/contactpreferences/mobile/add',
    handler: async (request, h) => {
      //request.payload = { authToken, msisdn }
      const response = await apiCall(
        request.payload,
        'member/verifyMobilePhoneStart'
      )
      return response
    }
  },
  {
    method: ['POST', 'PUT'],
    path: '/signup/contactpreferences/mobile/validate',
    handler: async (request, h) => {
      //request.payload = { authToken, msisdn, code }
      response = await apiCall(
        request.payload,
        'member/verifyMobilePhoneValidate'
      )
    }
  }
]
