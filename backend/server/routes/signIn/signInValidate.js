const apiCall = require('../../services/ApiService')
const codeValidation = require('../../services/Validations/CodeValidation')

const apiSignInValidateCall = async (signinToken, code) => {
  let isValid = 400
  let desc
  let profile
  let authToken
  let registration
  const raw = JSON.stringify({ signinToken: signinToken, code })
  if (signinToken !== '' && !codeValidation(code, 6)) {
    return { code: 101, desc: 'invalid code' }
  }

  // Parse the JSON response and get the status code
  const responseData = await apiCall(raw, 'member/signinValidate')
  if (responseData === undefined) return
  if (
    Object.prototype.hasOwnProperty.call(responseData, 'code') &&
    responseData.code === 101
  ) {
    isValid = responseData.code
    desc = responseData.desc
  } else {
    isValid = 200
    profile = responseData.profile
    authToken = responseData.authToken
    registration = responseData.registration
  }

  return isValid === 200
    ? { authToken, profile, registration }
    : { code: isValid, desc: desc }
}

module.exports = [
  {
    method: ['POST', 'PUT'],
    path: '/signInValidate',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        console.log('PAYLOADBACKEND')
        console.log(request.payload)
        const { signinToken, code } = request.payload
        const apiResponse = await apiSignInValidateCall(signinToken, code)
        let response
        if (!Object.prototype.hasOwnProperty.call(apiResponse, 'authToken')) {
          console.log('Invalid')
          response = {
            code: apiResponse.code,
            desc: apiResponse.desc
          }
        } else {
          console.log('Valid')
          response = {
            authToken: apiResponse.authToken,
            profile: apiResponse.profile,
            registration: apiResponse.registration
          }
        }
        return h.response(response)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
