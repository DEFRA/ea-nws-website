const {
  authCodeValidation
} = require('../../services/validations/AuthCodeValidation')
const { apiCall } = require('../../services/ApiService')

module.exports = [
  {
    method: ['POST'],
    path: '/signupValidate',
    handler: async (request, h) => {
      try {
        const { registerToken, code } = request.payload

        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }

        if (authCodeValidation(code) !== '') {
          return { status: 500, errorMessage: { code: 101, desc: 'Invalid code' } }
        }

        const data = { registerToken, code }
        const responseData = await apiCall(data, 'member/registerValidate')
        
        if (responseData === undefined) return

        return h.response(responseData)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ status: 500, errorMessage: 'error' })
      }
    }
  }
]
