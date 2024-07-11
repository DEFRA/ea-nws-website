const { apiCall } = require('../../../services/ApiService')
const {
  phoneValidation
} = require('../../../services/validations/PhoneValidation')

module.exports = [
  {
    method: ['POST'],
    path: '/api/add_contact/landline/add',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return h
            .response({ errorMessage: 'Oops, something happened!' })
            .code(400)
        }
        const { authToken, msisdn } = request.payload
        const error = phoneValidation(msisdn, 'mobileAndLandline')

        if (!error && authToken) {
          const response = await apiCall(msisdn, 'member/verifyHomePhoneStart')
          return h.response(response)
        } else {
          return h
            .response({
              errorMessage: !error ? 'Oops, something happened!' : error
            })
            .code(500)
        }
      } catch (error) {
        return h
          .response({
            errorMessage: 'Oops, something happened!'
          })
          .code(500)
      }
    }
  }
]
