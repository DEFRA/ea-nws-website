const apiCall = require('../../services/ApiService')
const emailValidation = require('../../services/Validations/EmailValidation')
const apiService = require('../../services/ApiService')

const apiSignupStartCall = async (email) => {
  const data = { email }
  console.log('Received from front-end: ', data)

  if (!emailValidation(email)) {
    return { status: 500, errorMessage: { code: 101, desc: 'Invalid code' } }
  }

  const responseData = await apiService.apiCall(data, 'member/registerStart')
  console.log('Received from API: ', responseData)
  if (responseData === undefined) return
  console.log('Status:', responseData.status)

  return responseData
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
