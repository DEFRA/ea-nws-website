const apiCall = require('../../../../services/ApiService')
const numberValidation = require('../../../../services/Validations/PhoneValidation')

const apiLandlineStartCall = async (phone, auth) => {
  let isValid = 400
  console.log('reached api call')
  const raw = JSON.stringify({ phone: phone, authToken: auth })
  console.log('Received from front-end: ', raw)
  if (email !== '' && !numberValidation(phone, 'mobileAndLandline')) {
    console.log('returning code 101', email)
    return { code: 101, desc: 'Invalid email' }
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
    path: '/signup/contactpreferences/landline/validate',
    handler: async (request, h) => {
      try {
        console.log('!!!!!')
        const { authToken, phoneNumber } = request.payload
        apiLandlineStartCall
        console.log('PAYLOAD: ', request.payload)
        const response = {
          text: 'Start!'
        }
        return h.response(response)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
