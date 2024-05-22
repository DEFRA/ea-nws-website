const apiCall = require('../../services/ApiService')

const apiRegisterCall = async (email) => {
  let isValid = 400
  console.log('reached api call')
  let registerToken = ''
  const raw = JSON.stringify({ email: email })
  console.log('Received from front-end: ', raw)
  if (!registerValidation(email)) {
    console.log('returning code 101', email)
    return { code: 101, desc: 'Invalid email' }
  }

  const responseData = await apiCall(raw, 'member/registerStart')
  if (responseData.hasOwnProperty('desc')) {
    isValid = responseData.code
    desc = responseData.desc
  } else {
    console.log('responseData', responseData)
    isValid = responseData.code
    registerToken = responseData.registerToken
  }
  console.log('Received from API: ', responseData)

  console.log({ code: isValid, registerToken: registerToken })
  return { code: isValid, registerToken: registerToken }
}

const registerValidation = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return email != '' && emailPattern.test(email)
}

module.exports = [
  {
    method: ['POST', 'PUT'],
    path: '/registerStart',
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
