const {
  emailValidation
} = require('../../services/validations/EmailValidation')
const { apiCall } = require('../../services/ApiService')

const apiSignupStartCall = async (email) => {
  const data = { email }
  console.log('Received from front-end: ', data)
  const errorValidation = emailValidation(email)

  try {
    if (errorValidation === '') {
      const response = await apiCall(data, 'member/registerStart')
      return response
    } else {
      return {
        status: 500,
        errorMessage: errorValidation
      }
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
    path: '/signupStart',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { email } = request.payload
        const apiResponse = await apiSignupStartCall(email)
        return h.response(apiResponse)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: ' error' }).code(500)
      }
    }
  }
]
