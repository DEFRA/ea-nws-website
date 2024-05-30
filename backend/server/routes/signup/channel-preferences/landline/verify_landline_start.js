const { apiCall } = require('../../../../services/ApiService')
const {
  numberValidation
} = require('../../../../services/validations/PhoneValidation')

const apiLandlineStartCall = async (phone, auth) => {
  const data = { phone: phone, authToken: auth }
  const validationError = numberValidation(phone, 'mobileAndLandline')
  try {
    if (validationError === '') {
      const responseData = await apiCall(data, 'member/verifyHomePhoneStart')
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
    path: '/signup/contactpreferences/landline/start',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { authToken, phone } = request.payload
        const apiResponse = await apiLandlineStartCall(phone, authToken)
        return h.response(apiResponse)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
