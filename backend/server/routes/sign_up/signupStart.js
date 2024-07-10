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
        if (!request.payload) {
          return h
            .response({ errorMessage: 'Oops, something happened!' })
            .code(400)
        }

        const { email } = request.payload
        const errorValidation = emailValidation(email)

        if (!errorValidation) {
          const response = await apiCall(email, 'member/registerStart')
          console.log(response)
          return h.response(response)
        } else {
          return h.response({ errorMessage: errorValidation }).code(500)
        }
      } catch (error) {
        return h
          .response({ errorMessage: 'Oops, something happened!' })
          .code(500)
      }
    }
  }
]
