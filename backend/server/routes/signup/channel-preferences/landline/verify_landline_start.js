const apiService = require('../../../../services/ApiService')
const numberValidation = require('../../../../services/Validations/PhoneValidation')

const apiLandlineStartCall = async (phone, auth) => {
  const data = { phone: phone, authToken: auth }
  console.log('Received from front-end: ', data)
  if (!numberValidation(phone, 'mobileAndLandline')) {
    return { code: 104, desc: 'Invalid phone' }
  }

  const responseData = await apiService.apiCall(
    data,
    'member/verifyHomePhoneStart'
  )
  console.log('Received from API: ', responseData)
  if (responseData === undefined) return
  console.log('Status:', responseData.status)
  return responseData.data
}

module.exports = [
  {
    method: ['POST'],
    path: '/signup/contactpreferences/landline/start',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { authToken, phone } = request.payload
        const apiResponse = await apiLandlineStartCall(phone, authToken)
        return h.response(apiResponse)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
