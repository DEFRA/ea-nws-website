const apiCall = require('../../services/ApiService')
const codeValidation = require('../../services/validations/CodeValidation')

const apiRegisterValidateCall = async (registerToken, code) => {
  let isValid = 400
  let desc
  let authToken
  const raw = { registerToken: registerToken, code: code }
  if (registerToken !== '' && !codeValidation(code, 6)) {
    return { code: 101, desc: 'invalid code' }
  }

  // Parse the JSON response and get the status code
  const responseData = await apiCall(raw, 'member/registerValidate')
  if (Object.prototype.hasOwnProperty.call(responseData, 'code')) {
    isValid = responseData.code
    desc = responseData.desc
  } else {
    isValid = 200
    authToken = responseData.authToken
  }

  return isValid === 200
    ? { authToken: authToken }
    : { code: isValid, desc: desc }
}

module.exports = [
  {
    method: ['POST', 'PUT'],
    path: '/registerValidate',
    handler: async (request, h) => {
      try {
        const { registerToken, code } = request.payload
        const apiResponse = await apiRegisterValidateCall(registerToken, code)
        console.log(apiResponse)
        let response
        if (Object.prototype.hasOwnProperty.call(apiResponse, 'code')) {
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
