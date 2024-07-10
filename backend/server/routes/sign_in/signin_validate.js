const { apiCall } = require('../../services/ApiService')
const {
  authCodeValidation
} = require('../../services/validations/AuthCodeValidation')

const apiSignInValidateCall = async (signinToken, code) => {
  const data = { signinToken, code }
  const errorValidation = authCodeValidation(code)

  try {
    if (errorValidation === '') {
      const response = await apiCall(data, 'member/signinValidate')
      return response
    } else {
      return { status: 500, errorMessage: errorValidation }
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
    path: '/api/signInValidate',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { signinToken, code } = request.payload
        const apiResponse = await apiSignInValidateCall(signinToken, code)
        return h.response(apiResponse)
      } catch (error) {
        return h.response({
          status: 500,
          errorMessage: 'Oops, something happened!'
        })
      }
    }
  }
]
