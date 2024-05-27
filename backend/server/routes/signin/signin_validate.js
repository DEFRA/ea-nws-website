const apiService = require('../../services/ApiService')
const codeValidation = require('../../services/Validations/CodeValidation')

const apiSignInValidateCall = async (signinToken, code) => {
  const data = { signinToken, code }
  if (signinToken !== '' && !codeValidation(code, 6)) {
    return { code: 101, desc: 'invalid code' }
  }

  // Parse the JSON response and get the status code
  const responseData = await apiService.apiCall(data, 'member/signinValidate')
  if (responseData === undefined) return
  return responseData.data
}

module.exports = [
  {
    method: ['POST'],
    path: '/signInValidate',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { signinToken, code } = request.payload
        const apiResponse = await apiSignInValidateCall(signinToken, code)

        return h.response(apiResponse)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
