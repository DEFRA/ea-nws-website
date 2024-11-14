const responseCodes = require('../../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'
const mockResponses = require('../../mockResponses')

async function getMobileStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { msisdn } = req.payload as { msisdn: string }
  console.log(msisdn)
  // 200 Success
  if (authToken !== 'WrongAuthToken') {
    if (msisdn === '+447000000000') {
      console.log('duplicate mobile, responding 500')
      return res.response(responseCodes.DUPLICATE_MOBILE).code(500)
    }
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getMobileValidate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { msisdn } = req.payload as { msisdn: string }
  const { code } = req.payload as { code: string }
  let mockProfile = mockResponses.citizenProfile
  mockProfile.mobilePhones.push(msisdn)


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

module.exports = { getMobileStart, getMobileValidate }
