const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getDeleteAccount(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }

  if (authToken !== 'MockAuthToken') {
    console.log('invalid credentials, responding 101')
    return res.response(responseCodes.UNAUTHORIZED).code(500)
  }
}

module.exports = { getDeleteAccount }
