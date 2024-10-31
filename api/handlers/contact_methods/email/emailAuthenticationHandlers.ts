const responseCodes = require('../../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'
const mockResponses = require('../../mockResponses')

async function getEmailStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { email } = req.payload as { email: string }
  // 200 Success
  if (authToken !== 'WrongAuthToken' && email !== 'invalid@email.com') {
    if (email === 'duplicate@email.com') {
      console.log('duplicate email, responding 500')
      return res.response(responseCodes.DUPLICATE_EMAIL).code(500)
    }
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getEmailValidate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { email } = req.payload as { email: string }
  const { code } = req.payload as { code: string }
  let mockProfile = mockResponses.citizenProfile
  mockProfile.emails.push(email)
  
  if(code === '111111'){
    console.log("invalid credentials, responding 101")
    return res.response(responseCodes.UNAUTHORIZED).code(500)
  }
  // 200 Success
  if (authToken !== 'WrongAuthToken' && code != '999999') {
    return {
      profile: mockProfile
    }
  } else {
    return res.response(responseCodes.INVALID_CODE).code(500)
  }
}

module.exports = { getEmailStart, getEmailValidate }
