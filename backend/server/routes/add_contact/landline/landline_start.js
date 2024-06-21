const { apiCall } = require('../../../services/ApiService')
const {
  phoneValidation
} = require('../../../services/validations/PhoneValidation')
const apiToFrontendError = require('../../../services/ApiToFrontendError')

const apiLandlineStartCall = async (msisdn, auth) => {
  const data = { msisdn, authToken: auth }
  const validationError = phoneValidation(msisdn, 'mobileAndLandline')
  try {
    if (validationError === '') {
      const response = await apiCall(data, 'member/verifyHomePhoneStart')
      if (response.errorMessage) {
        if (response.errorMessage.code) {
          response.errorMessage.desc =
            apiToFrontendError[response.errorMessage.code]['add_contact']['landline'] || response.errorMessage.desc
        }
      }
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
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { authToken, msisdn } = request.payload
        const apiResponse = await apiLandlineStartCall(msisdn, authToken)
        return h.response(apiResponse)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
