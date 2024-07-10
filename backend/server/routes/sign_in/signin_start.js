const { apiCall } = require('../../services/ApiService')
const {
  emailValidation
} = require('../../services/validations/EmailValidation')

const apiSignInStartCall = async (email) => {
  const data = { email }
  const errorValidation = emailValidation(email)
  try {
    if (errorValidation === '') {
      const response = await apiCall(data, 'member/signinStart')
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
    path: '/api/signInStart',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { email } = request.payload
        const apiResponse = await apiSignInStartCall(email, h)

        request.log(['info'], apiResponse)
        return h.response(apiResponse)
      } catch (error) {
        return h.response({
          status: 500,
          errorMessage: 'Internal server error'
        })
      }
    }
  }
]
