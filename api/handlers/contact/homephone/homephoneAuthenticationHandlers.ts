const responseCodes = require('../../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'
const mockResponses = require('../../mockResponses')

async function getHomephoneStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { msisdn } = req.payload as { msisdn: string }

  if (authToken !== 'WrongAuthToken') {
    if (msisdn === '+441000000000') {
      console.log('duplicate phone, responding 500')
      return res.response(responseCodes.DUPLICATE_PHONE).code(500)
    }
    return res.response(responseCodes.SUCCESS)
  }
  return res.response(responseCodes.INVALID_TOKEN).code(500)
}

async function getHomephoneValidate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { msisdn } = req.payload as { msisdn: string }
  const { code } = req.payload as { code: string }
  console.log('Received LandlineValidate request: ', req.payload)
  console.log(msisdn)
  let mockProfile = mockResponses.profile
  mockProfile.homePhones.push(msisdn)
  

  if(code === '111111'){
    console.log("invalid credentials, responding 101")
    return res.response(responseCodes.UNAUTHORIZED).code(500)
  }
  // 200 Success
  if (authToken !== 'WrongAuthToken' && code !== '999999') {
    return {
      profile: mockProfile
    }
  } else {
    return res.response(responseCodes.INVALID_CODE).code(500)
  }
}
module.exports = { getHomephoneStart, getHomephoneValidate }
