const { apiCall } = require('../../../services/ApiService')
const {
  fullNameValidation
} = require('../../../services/validations/FullNameValidation')

const apiFullNameCall = async (auth, firstName, lastName) => {
  const data = { firstName, lastName, authToken: auth }
  const validationError = fullNameValidation(firstName, lastName)
  try {
    if (validationError === '') {
      const response = await apiCall(data, 'member/verifyFullNameStart')
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
    path: '/api/add_contact/name/add',
    handler: async (request, h) => {
      console.log(request.payload)
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }

        const { authToken, firstName, lastName } = request.payload
        const apiResponse = await apiFullNameCall(
          authToken,
          firstName,
          lastName
        )
        return h.response(apiResponse)
      } catch (error) {
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
