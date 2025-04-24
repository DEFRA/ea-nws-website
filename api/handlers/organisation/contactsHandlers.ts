const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'
const mockContacts = require('../mockContacts')

async function getOrgCreateContacts(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, contacts } = req.payload as {
    authToken: string
    contacts: Array<{}>
  }

  if (authToken !== 'WrongAuthToken' && contacts) {
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getOrgListContacts(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }

  if (authToken !== 'WrongAuthToken') {
    return {
      contacts: mockContacts.allContacts,
      total: mockContacts.allContacts.length
    }
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getOrgDemoteContact(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, contactId } = req.payload as {
    authToken: string
    contactId: string
  }

  if (authToken !== 'WrongAuthToken' && contactId) {
    const contact = mockContacts.allContacts.filter((contact: any) => contact.id === contactId)[0]
    contact.role = null
    contact.pendingRole = null
    // geosafe returns the contact
    return res.response({ contact: contact })
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getOrgRemoveContacts(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, contactIds } = req.payload as {
    authToken: string
    contactIds: Array<string>
  }

  if (authToken !== 'WrongAuthToken' && contactIds) {
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getOrgPromoteContact(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, contactId, role } = req.payload as {
    authToken: string
    contactId: string
    role: string
  }

  if (
    authToken !== 'WrongAuthToken' &&
    contactId &&
    (role === 'SELF' || role === 'ADMIN' || role === 'READONLY')
  ) {
    const contact = mockContacts.allContacts.filter((contact: any) => contact.id === contactId)[0]
    if (contact?.role) {
      contact.role = role
    } else {
      contact.pendingRole = role
    }
    // geosafe returns the contact
    return res.response({ contact: contact })
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getOrgUpdateContact(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, contact } = req.payload as {
    authToken: string
    contact: {}
  }

  if (authToken !== 'WrongAuthToken' && contact) {
    // geosafe returns the contact
    return { contact: contact }
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = {
  getOrgCreateContacts,
  getOrgListContacts,
  getOrgDemoteContact,
  getOrgRemoveContacts,
  getOrgPromoteContact,
  getOrgUpdateContact
}
