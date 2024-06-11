const {
  emailValidation
} = require('../../services/validations/EmailValidation')
const { apiCall } = require('../../services/ApiService')

module.exports = [
  {
    method: ['POST'],
    path: '/api/signupStart',
    handler: async (request, h) => {
      try {
        const { email } = request.payload
        const errorValidation = emailValidation(email)
        const data = {email}
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }

        if (errorValidation === '') {
          const response = await apiCall(data, 'member/registerStart')
          return h.response(response)
        } else {
          return h.response({ status: 500, errorMessage: errorValidation })
        }

        if (errorValidation === '') {
          const response = await apiCall(data, 'member/registerStart')
          return h.response(response)
        } else{
          return h.response({status:500, errorMessage: errorValidation})
        }
      } catch (error) {
        console.error('Error:', error)
        return h.response({ status: 500, errorMessage: 'error' })
        return h.response({ status:500, errorMessage: 'error'})
      }
    }
  }
]
