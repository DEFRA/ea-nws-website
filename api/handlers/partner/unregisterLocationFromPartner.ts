const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getUnregisterLocationFromPartner(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { locationId } = req.payload as { locationId: string }
  const { partnerId } = req.payload as { partnerId: string }

  if (authToken !== 'WrongAuthToken') {
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = { getUnregisterLocationFromPartner }
