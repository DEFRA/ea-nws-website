const apiCall = require('../../services/ApiService')
const emailValidation = require('../../services/Validations/EmailValidation')

const apiSignUpCall = async (email) => {
  let isValid = 400
  console.log('reached api call')
  const raw = JSON.stringify({ email })
  console.log('Received from front-end: ', raw)
  if (email !== '' && !emailValidation(email)) {
    console.log('returning code 101', email)
    return { code: 101, desc: 'Invalid email' }
  }

  const responseData = await apiCall(raw, 'member/registerStart')
  console.log('Received from API: ', responseData.registerToken)
  if (responseData === undefined) return
  if (Object.prototype.hasOwnProperty.call(responseData, 'desc')) {
    isValid = responseData.code
    const desc = responseData.desc
    return { code: isValid, desc: desc }
  } else {
    isValid = responseData.code
    const registerToken = responseData.registerToken
    return { code: isValid,  registerToken }
  }
}

module.exports = [
  {
    method: ['POST', 'PUT'],
    path: '/signupStart',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { email } = request.payload
        // do some email validation
        const apiResponse = await apiSignUpCall(email)
        const response = {
          code: apiResponse.code,
          registerToken: apiResponse.registerToken
        }
        console.log("responses", response)
        return h.response(response)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
