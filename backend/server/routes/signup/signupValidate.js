const apiCall = require('../../services/ApiService')
const codeValidation = require('../../services/Validations/CodeValidation')
const apiService = require('../../services/ApiService')


module.exports = [
  {
    method: ['POST', 'PUT'],
    path: '/signupValidate',
    handler: async (request, h) => {
      
      const { registerToken, code } = request.payload
      let response = codeValidation(code)

      console.log("register token payload", registerToken, code)
      response = await apiService.apiCall(request.payload, 'member/registerValidate')
      return response
    }
  }
]
