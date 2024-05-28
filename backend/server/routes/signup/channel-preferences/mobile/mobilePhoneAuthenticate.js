const { apiCall } = require('../../../../services/ApiService')
const {
  phoneValidation
} = require('../../../../services/validations/PhoneValidation')
const {
  authCodeValidation
} = require('../../../../services/validations/AuthCodeValidation')

module.exports = [
  {
    method: ['POST', 'PUT'],
    path: '/signup/contactpreferences/mobile/add',
    handler: async (request, h) => {
      const { msisdn } = request.payload
      // progressive enhancement validation
      let response = phoneValidation(msisdn, 'mobile')

      // request.payload = { authToken, msisdn }
      response = await apiCall(request.payload, 'member/verifyMobilePhoneStart')
      return response
    }
  },
  {
    method: ['POST', 'PUT'],
    path: '/signup/contactpreferences/mobile/validate',
    handler: async (request, h) => {
      const { msisdn, code } = request.payload
      // progressive enhancement validation
      let response = phoneValidation(msisdn, 'mobile')
      response = authCodeValidation(code)

      // request.payload = { authToken, msisdn, code }
      response = await apiCall(
        request.payload,
        'member/verifyMobilePhoneValidate'
      )
      return response
    }
  }
]
