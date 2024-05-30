const { apiCall } = require('../../services/ApiService')
const {
  emailValidation
} = require('../../services/validations/EmailValidation')

const apiRegisterCall = async (email) => {
  let isValid = 400
  console.log('reached api call')
  let registerToken = ''
  const raw = JSON.stringify({ email: email })
  console.log('Received from front-end: ', raw)
  if (email !== '' && !emailValidation(email)) {
    console.log('returning code 101', email)
    return { code: 101, desc: 'Invalid email' }
  }

  const responseData = await apiCall(raw, 'member/registerStart')
  if (Object.prototype.hasOwnProperty.call(responseData, 'desc')) {
    isValid = responseData.code
  } else {
    console.log('responseData', responseData)
    isValid = responseData.code
    registerToken = responseData.registerToken
  }
  console.log('Received from API: ', responseData)

  console.log({ code: isValid, registerToken: registerToken })
  return { code: isValid, registerToken: registerToken }
}

module.exports = [
  {
    method: ['POST', 'PUT'],
    path: '/register_start',
    handler: async (request, h) => {
      try {
        const { email } = request.payload
        // do some email validation
        const apiResponse = await apiRegisterCall(email)
        const response = {
          code: apiResponse.code,
          registerToken: apiResponse.registerToken
        }

        return h.response(response)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
