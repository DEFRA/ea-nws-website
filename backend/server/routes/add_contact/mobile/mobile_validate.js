const { apiCall } = require('../../../services/ApiService')
const {
  authCodeValidation
} = require('../../../services/validations/AuthCodeValidation')

const apiMobileValidateCall = async (code, msisdn, auth) => {
  const data = { msisdn, authToken: auth, code }
  try {
    const validationError = authCodeValidation(code)
    if (validationError === '') {
      const response = await apiCall(data, 'member/verifyMobilePhoneValidate')
      return response
    } else {
      return { status: 500, errorMessage: validationError }
    }
  } catch (error) {
    return {
      status: 500,
      errorMessage: 'Oops, something happened!'
    }
  }
}
module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/mobile/validate',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { authToken, msisdn, code } = request.payload

        const apiResponse = await apiMobileValidateCall(
          code,
          msisdn,
          authToken
        )
        return h.response(apiResponse)
      } catch (error) {
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
