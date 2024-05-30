const { apiCall } = require('../../../../services/ApiService')
const {
  codeValidation
} = require('../../../../services/validations/AuthCodeValidation')
const {
  numberValidation
} = require('../../../../services/validations/PhoneValidation')

const apiLandlineValidateCall = async (code, phone, auth, h) => {
  const data = { msisdn: phone, authToken: auth, code: code }
  console.log('Received from front-end: ', data)
  try {
    const validationError = codeValidation(code)
    if (validationError === '') {
      const response = await apiCall(data, 'member/verifyHomePhoneValidate')
      return h.response({ response })
    } else {
      return h.response({ status: 500, errorMessage: validationError })
    }
  } catch (error) {
    return h.response({
      status: 500,
      errorMessage: 'Oops, something happened!'
    })
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
        const { authToken, phone, code } = request.payload

        const apiResponse = await apiLandlineValidateCall(
          code,
          phone,
          authToken,
          h
        )
        return h.response(apiResponse)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
