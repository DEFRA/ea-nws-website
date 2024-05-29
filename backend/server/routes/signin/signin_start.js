const apiService = require('../../services/ApiService')
const emailValidation = require('../../services/Validations/EmailValidation')

const apiSignInStartCall = async (email) => {
  const data = { email }
  console.log('Received from front-end: ', data)

  if (!emailValidation(email)) {
    return { status: 500, data: { code: 106, desc: 'Invalid email' } }
  }

  const responseData = await apiService.apiCall(data, 'member/signinStart')
  console.log('Received from API: ', responseData)
  if (responseData === undefined) return
  console.log('Status:', responseData.status)

  return responseData
}

module.exports = [
  {
    method: ['POST'],
    path: '/signInStart',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { email } = request.payload
        const apiResponse = await apiSignInStartCall(email)
        return h.response(apiResponse)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
