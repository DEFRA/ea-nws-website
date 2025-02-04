const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'
import uuidv4 from '../generateAuthToken'
const mockResponses = require('../mockResponses')

async function getSigninStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  console.log('Received SignInStart request for: ', req.payload)
  const { email } = req.payload as { email: string }
  const { signupComplete } = req.payload as { signupComplete:string }
  if (email === 'invalid@email.com') {
    return res.response(responseCodes.UNKNOWN_EMAIL).code(500)
  }
  if(signupComplete === 'pending'){
    return res.response(responseCodes.PENDING_ACCOUNT).code(500)
  }
  console.log('Valid email, responding 200')
  return { signinToken: '123456' }
}

async function getSigninValidate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  console.log('Received SignInValidate request: ', req.payload)
  const { code, signinToken } = req.payload as {
    code: string
    signinToken: string
  }
  if(code === '111111'){
    console.log("invalid credentials, responding 101")
    return res.response(responseCodes.UNAUTHORIZED).code(500)
  }
  if (code === '999999' || signinToken === undefined) {
    console.log('Invalid token')
    return res.response(responseCodes.INVALID_CODE).code(500)
  }
  console.log('Valid token')
  const profile = mockResponses.citizenProfile2
  const registrations = mockResponses.registrations
  const organization = mockResponses.organization

  // also returns organization
  return {
    authToken: uuidv4(),
    profile: profile,
    registrations: registrations,
    organization: organization
  }
}
module.exports = { getSigninStart, getSigninValidate }
