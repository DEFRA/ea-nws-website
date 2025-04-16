const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'
import uuidv4 from '../generateAuthToken'
const mockResponses = require('../mockResponses')
const mockContacts = require('../mockContacts')


async function getOrgValidateInvitation(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { inviteToken } = req.payload as { inviteToken: string }

  if (inviteToken) {
    //geosafe returns authtoken, contact and org
    const authToken = uuidv4()
    const contact = mockContacts[0]
    contact.role = contact.pendingRole
    const organization = mockResponses.organization
    return res.response({
      authToken: authToken,
      contact: contact,
      organization: organization
    })
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = { getOrgValidateInvitation }