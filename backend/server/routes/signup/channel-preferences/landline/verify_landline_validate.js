const { apiCall } = require('../../../../services/ApiService')
const {
  authCodeValidation
} = require('../../../../services/validations/AuthCodeValidation')
const {
  phoneValidation
} = require('../../../../services/validations/PhoneValidation')

const apiLandlineValidateCall = async (code, msisdn, auth, h) => {
  const data = { msisdn, authToken: auth, code }
  console.log('Received from front-end: ', data)
  try {
    let validationError = authCodeValidation(code)
    validationError =
      validationError === ''
        ? phoneValidation(msisdn, 'mobileAndLandline')
        : validationError
    if (validationError === '') {
      const response = await apiCall(data, 'member/verifyHomePhoneValidate')
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
    path: '/signup/contactpreferences/landline/validate',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { authToken, msisdn, code } = request.payload

        const apiResponse = await apiLandlineValidateCall(
          code,
          msisdn,
          authToken
        )
        return h.response(apiResponse)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
