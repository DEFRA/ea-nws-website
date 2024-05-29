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
      try {
        const { msisdn } = request.payload
        // progressive enhancement validation
        const validationError = phoneValidation(msisdn, 'mobile')

        if (validationError === '') {
          // request.payload = { authToken, msisdn }
          const response = await apiCall(
            request.payload,
            'member/verifyMobilePhoneStart'
          )
          return h.response({ response })
        } else {
          return h.response({ status: 500, errorMessage: validationError })
        }
      } catch (error) {
        return h.response({ errorMessage: 'Oops, something happened!' })
      }
    }
  },
  {
    method: ['POST', 'PUT'],
    path: '/signup/contactpreferences/mobile/validate',
    handler: async (request, h) => {
      try {
        const { code } = request.payload
        // progressive enhancement validation
        const validationError = authCodeValidation(code)

        if (validationError === '') {
          // request.payload = { authToken, msisdn, code }
          const response = await apiCall(
            request.payload,
            'member/verifyMobilePhoneValidate'
          )
          return h.response({ response })
        } else {
          return h.response({ status: 500, errorMessage: validationError })
        }
      } catch (error) {
        return h.response({ errorMessage: 'Oops, something happened!' })
      }
    }
  }
]
