const apiCall = require('../../../../services/ApiService')
const codeValidation = require('../../../../services/Validations/CodeValidation')

const apiLandlineValidateCall = async (code, number, auth) => {
  let isValid = 400
  console.log('reached api call')
  let registerToken = ''
  const raw = JSON.stringify({ email: email })
  console.log('Received from front-end: ', raw)
  if (email !== '' && !codeValidation(code, 6)) {
    console.log('returning code 101', email)
    return { code: 101, desc: 'Invalid token' }
  }
  return
  /*
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
*/
}
module.exports = [
  {
    method: ['POST'],
    path: '/signup/contactpreferences/landline/add',
    handler: async (request, h) => {
      try {
        const { authToken, phoneNumber, code } = request.payload

        const apiResponse = await apiLandlineValidateCall(email)
        console.log('PAYLOAD: ', request.payload)
        const response = {
          text: 'Validate!'
        }
        return h.response(response)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
