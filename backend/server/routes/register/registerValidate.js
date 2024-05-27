const apiCall = require('../../services/ApiService')
const codeValidation = require('../../services/Validations/CodeValidation')

const apiRegisterValidateCall = async (registerToken, code) => {
  console.log("register tokem", registerToken)
  let isValid = 400
  let desc
  let authToken
  const raw = JSON.stringify({ registerToken: registerToken, code: code })
  if (registerToken !== '' && !codeValidation(code, 6)) {
    return { code: 101, desc: 'invalid code' }
  }

  // Parse the JSON response and get the status code
  const responseData = await apiCall(raw, 'member/registerValidate')
  if (responseData === undefined) return
  if (Object.prototype.hasOwnProperty.call(responseData, 'code') && responseData.code === 101) {
    isValid = responseData.code
    desc = responseData.desc
  } else {
    isValid = 200
    authToken = responseData.authToken
  }

  return isValid === 200
    ? { authToken }
    : { code: isValid, desc: desc }
}

module.exports = [
  {
    method: ['POST', 'PUT'],
    path: '/registerValidate',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }

        const { registerToken, code } = request.payload
        console.log("register token payload", request.payload)
        const apiResponse = await apiRegisterValidateCall(registerToken, code)
        console.log(apiResponse)
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
            authToken: apiResponse.authToken
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
