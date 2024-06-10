const { apiCall } = require('../../../services/ApiService')
const {
  emailValidation
} = require('../../../services/validations/EmailValidation')

const apiEmailStartCall = async (email, auth) => {
  const data = { email: email, authToken: auth }
  const validationError = emailValidation(email)
  try {
    if (validationError === '') {
      const response = await apiCall(data, 'member/verifyEmailStart')
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
    path: '/add_contact/email/add',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { authToken, email } = request.payload
        const apiResponse = await apiEmailStartCall(email, authToken)
        return h.response(apiResponse)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
