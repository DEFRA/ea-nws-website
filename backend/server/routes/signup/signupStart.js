const apiCall = require('../../services/ApiService')
const emailValidation = require('../../services/Validations/EmailValidation')
const apiService = require('../../services/ApiService')

const apiSignUpCall = async (email) => {
  const data = { email }
  console.log('Received from front-end: ', data)

  if (!emailValidation(email)) {
    return { code: 106, desc: 'Invalid email' }
  }

  const responseData = await apiService.apiCall(data, 'member/registerStart')
  console.log('Received from API: ', responseData)
  if (responseData === undefined) return
  console.log('Status:', responseData.status)

  return responseData.data
    
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
        // do some email validation
        const apiResponse = await apiSignUpCall(email)
        return h.response(apiResponse)
        
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
