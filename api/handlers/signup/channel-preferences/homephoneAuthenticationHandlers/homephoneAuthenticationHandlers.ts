const responseCodes = require('../../../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getHomephoneStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  console.log('Received LandlineStart request: ', req.payload)
  const { authToken } = req.payload as { authToken: string }
  const { msisdn } = req.payload as { msisdn: string }

  if (authToken === 'MockGUIDAuthToken') {
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

  // 200 Success
  if (code === '123456') {
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_CODE).code(500)
  }
}
module.exports = { getHomephoneStart, getHomephoneValidate }
