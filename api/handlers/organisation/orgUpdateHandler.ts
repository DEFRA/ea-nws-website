const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getOrgUpdate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, organization } = req.payload as { authToken: string, organization: {} }

  if (authToken !== 'WrongAuthToken' && organization) {
    //geosafe returns updated org
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = { getOrgUpdate }