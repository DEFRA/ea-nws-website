const codeValidation = require('../../services/Validations/CodeValidation')
const apiService = require('../../services/ApiService')

const apiSignupValidateCall = async (registerToken, code) => {
  const data = { registerToken, code }

  if (!codeValidation(code, 6)) {
    return { status: 500, errorMessage: { code: 101, desc: 'Invalid code' } }
  }

  // Parse the JSON response and get the status code
  const responseData = await apiService.apiCall(data, 'member/registerValidate')
  if (responseData === undefined) return
  return responseData
}

module.exports = [
  {
    method: ['POST'],
    path: '/signupValidate',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { registerToken, code } = request.payload
        const apiResponse = await apiSignupValidateCall(registerToken, code)

        return h.response(apiResponse)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'error' }).code(500)
      }
    }
  }
]
