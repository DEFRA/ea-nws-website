const { apiCall } = require('../../../services/ApiService')
const {
  phoneValidation
} = require('../../../services/validations/PhoneValidation')

const apiLandlineStartCall = async (msisdn, auth) => {
  const data = { msisdn, authToken: auth }
  const validationError = phoneValidation(msisdn, 'mobileAndLandline')
  try {
    if (validationError === '') {
      const response = await apiCall(data, 'member/verifyHomePhoneStart')
      return response
    } else {
      return { status: 500, errorMessage: validationError }
    }
  } catch (error) {
    return {
      status: 500,
      errorMessage: 'Oops, something happened!'
    }
  }
}

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
        const errorValidation = phoneValidation(msisdn, 'mobileAndLandline')

        if (!errorValidation && authToken) {
          const response = await apiCall(msisdn, 'member/verifyHomePhoneStart')
          return h.response(response)
        } else {
          return h
            .response({
              errorMessage: errorValidation
                ? errorValidation
                : 'Oops, something happened!'
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
