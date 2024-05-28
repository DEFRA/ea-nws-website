const apiCall = require('../../services/ApiService')
const emailValidation = require('../../services/Validations/EmailValidation')
const apiService = require('../../services/ApiService')

module.exports = [
  {
    method: ['POST', 'PUT'],
    path: '/signupStart',
    handler: async (request, h) => {
    
        const { email } = request.payload
        // do some email validation
        let response = emailValidation(email)
        response = await apiService.apiCall(request.payload, 'member/registerStart')
        console.log("here", response)
      return response
    }
  }
]
