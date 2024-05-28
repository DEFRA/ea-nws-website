const apiCall = require('../../services/ApiService')
const codeValidation = require('../../services/Validations/CodeValidation')
const apiService = require('../../services/ApiService')

const apiSignupValidateCall = async (registerToken, code) => {
  console.log("register tokem", registerToken)
 
  const data = { registerToken, code}
  if (registerToken !== '' && !codeValidation(code, 6)) {
    return { code: 101, desc: 'invalid code' }
  }

  // Parse the JSON response and get the status code
  const responseData = await apiService.apiCall(data, 'member/registerValidate')
  if (responseData === undefined) return

  return responseData.data
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
        console.log("register token payload", registerToken, code)
        const apiResponse = await apiSignupValidateCall(registerToken, code)
        console.log(apiResponse)

        return h.response(apiResponse)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
