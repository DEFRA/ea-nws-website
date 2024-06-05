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
        const data = { registerToken, code }
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }

        if (authCodeValidation(code) === '') {
          const responseData = await apiCall(data, 'member/registerValidate')
          return h.response(responseData)
        }else {
          return h.response({status:500, errorMessage: {code: 101, desc: 'Invalid code'}})
        }
      } catch (error) {
        console.error('Error:', error)
        return h.response({ status: 500, errorMessage: 'error' })
      }
    }
  }
]
