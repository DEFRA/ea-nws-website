const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getRegisterToPartner(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { partnerId } = req.payload as { partnerId: string }
  const { params } = req.payload as { params: Object }

  if (authToken !== 'WrongAuthToken' && Object.keys(params).length != 0 && partnerId) {
    // Geosafe returns 
    // {registrations: [{id: '', name: ''},...]}
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getUnregisterFromPartner(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { partnerId } = req.payload as { partnerId: string }

  if (authToken !== 'WrongAuthToken' && partnerId) {
    // Geosafe returns 
    // {registrations: [{id: '', name: ''},...]}
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getUpdateRegistration(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { partnerId } = req.payload as { partnerId: string }
  const { params } = req.payload as { params: Object }

  if (authToken !== 'WrongAuthToken' && Object.keys(params).length != 0 && partnerId) {
    // Geosafe returns 
    // {registrations: [{id: '', name: ''},...]}
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getOrgListRegistrations(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }

  if (authToken !== 'WrongAuthToken') {
    // Geosafe returns 
    // {registrations: [{id: '', name: ''},...]}
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}


module.exports = { getRegisterToPartner, getUnregisterFromPartner, getUpdateRegistration, getOrgListRegistrations }
