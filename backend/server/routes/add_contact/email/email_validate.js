const { apiCall } = require('../../../services/ApiService')
const {
  authCodeValidation
} = require('../../../services/validations/AuthCodeValidation')

const apiLandlineValidateCall = async (code, email, auth, h) => {
  const data = { email: email, authToken: auth, code: code }
  try {
    const validationError = authCodeValidation(code)
    if (validationError === '') {
      const response = await apiCall(data, 'member/verifyEmailValidate')
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
    path: '/api/add_contact/email/validate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return h
            .response({ errorMessage: 'Oops, something happened!' })
            .code(400)
        }

        const { authToken, email, code } = request.payload
        const errorValidation = authCodeValidation(code)

        if (!errorValidation && authToken && email) {
          const response = await apiCall(email, 'member/signinValidate')
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
