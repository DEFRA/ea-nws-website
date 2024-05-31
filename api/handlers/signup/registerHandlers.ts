const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getRegisterStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  console.log('Received register start request for: ', req.payload)
  const { email } = req.payload as { email: string }

  console.log('Valid email, responding 200')
  return { registerToken: '123456' }
}

async function getRegisterValidate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  console.log('Received register request --  ', req.payload)
  const { code, registerToken } = req.payload as {
    code: string
    registerToken: string
  }
  if (code === '999999' || registerToken === '') {
    console.log('Invalid token')
    return res.response(responseCodes.INVALID_CODE).code(500)
  }
  console.log('Valid token')

  return { authToken: 'MockGUIDAuthToken' }
}

module.exports = { getRegisterStart, getRegisterValidate }
