const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getOrgValidateInvitation(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { inviteToken } = req.payload as { inviteToken: string }

  if (inviteToken) {
    //geosafe returns authtoken, contact and org
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = { getOrgValidateInvitation }