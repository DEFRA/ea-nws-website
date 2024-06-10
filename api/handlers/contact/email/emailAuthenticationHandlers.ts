const responseCodes = require('../../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getEmailStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { email } = req.payload as { email: string }
  // 200 Success
  if (authToken === 'MockAuthToken') {
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
  // 200 Success
  if (authToken === 'MockAuthToken') {
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_CODE).code(500)
  }
}

module.exports = { getEmailStart, getEmailValidate }
