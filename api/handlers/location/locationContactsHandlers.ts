const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getLocationAttachContacts(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, locationId, contactIds } = req.payload as { authToken: string, locationId: string, contactIds: Array<string> }

  if (authToken !== 'WrongAuthToken' && locationId && contactIds) {
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getLocationDetachContacts(
    context: Context,
    req: Hapi.Request,
    res: Hapi.ResponseToolkit
  ) {
    const { authToken, locationId, contactIds } = req.payload as { authToken: string, locationId: string, contactIds: Array<string> }
  
    if (authToken !== 'WrongAuthToken' && locationId && contactIds) {
      return res.response(responseCodes.SUCCESS)
    } else {
      return res.response(responseCodes.INVALID_TOKEN).code(500)
    }
  }

module.exports = { getLocationAttachContacts, getLocationDetachContacts }
