const { apiCall } = require('../../../services/ApiService')
const {
  authCodeValidation
} = require('../../../services/validations/AuthCodeValidation')

const apiLandlineValidateCall = async (code, email, auth, h) => {
  const data = { email: email, authToken: auth, code: code }
  console.log('Received from front-end: ', data)
  try {
    const validationError = authCodeValidation(code)
    if (validationError === '') {
      const response = await apiCall(data, 'member/verifyEmailValidate')
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
    path: '/api/add_contact/email/validate',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { authToken, email, code } = request.payload

        const apiResponse = await apiLandlineValidateCall(
          code,
          email,
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
