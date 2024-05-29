const apiService = require('../../../../services/ApiService')
const codeValidation = require('../../../../services/Validations/CodeValidation')
const numberValidation = require('../../../../services/Validations/PhoneValidation')

const apiLandlineValidateCall = async (code, phone, auth) => {
  const data = { msisdn: phone, authToken: auth, code: code }
  console.log('Received from front-end: ', data)
  if (!numberValidation(phone, 'mobileAndLandline')) {
    return { code: 104, desc: 'Invalid phone' }
  }
  if (!codeValidation(code, 6)) {
    return { status: 500, data: { code: 101, desc: 'Invalid code' } }
  }

  const responseData = await apiService.apiCall(
    data,
    'member/verifyHomePhoneValidate'
  )
  console.log('Received from API: ', responseData)
  if (responseData === undefined) return
  // console.log('Status:', responseData.statusCode)
  return responseData
}
module.exports = [
  {
    method: ['POST'],
    path: '/signup/contactpreferences/landline/validate',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }
        const { authToken, phone, code } = request.payload

        const apiResponse = await apiLandlineValidateCall(
          code,
          phone,
          authToken
        )
        return h.response(apiResponse)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
