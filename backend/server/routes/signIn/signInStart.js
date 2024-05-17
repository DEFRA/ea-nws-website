const apiCall = require('../../services/ApiService')
const signInStartValidation = require('../../services/Validations/EmailValidation')

const apiSignInStartCall = async (email) => {
  let isValid = 400
  const raw = JSON.stringify({ email })
  console.log('Received from front-end: ', raw)
  if (!signInStartValidation(email)) {
    return { code: 101, desc: 'Invalid email' }
  }

  const responseData = await apiCall(raw, 'member/signinStart')
  console.log('Received from API: ', responseData)
  if (responseData === undefined) return
  if (Object.prototype.hasOwnProperty.call(responseData, 'desc')) {
    isValid = responseData.code
    const desc = responseData.desc
    return { code: isValid, desc: desc }
  } else {
    console.log('responseData', responseData)
    isValid = responseData.code
    const signinToken = responseData.signInToken
    return { code: isValid, signinToken }
  }
}

module.exports = [
  {
    method: ['POST', 'PUT'],
    path: '/signInStart',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { email } = request.payload
        const apiResponse = await apiSignInStartCall(email)
        const response = {
          code: apiResponse.code,
          signInToken: apiResponse.signInToken
        }

        return h.response(response)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
