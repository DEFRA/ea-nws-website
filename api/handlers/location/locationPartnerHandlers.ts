const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getLocationRegisterToPartner(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, locationId, partnerId, params } = req.payload as { authToken: string, locationId: string, partnerId: string, params: Object }

  if (authToken !== 'WrongAuthToken' && Object.keys(params).length != 0 && partnerId && locationId) {
    // Geosafe returns 
    // {registrations: [{id: '', name: ''},...]}
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getLocationUnregisterFromPartner(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, locationId, partnerId } = req.payload as { authToken: string, locationId: string, partnerId: string }

  if (authToken !== 'WrongAuthToken' && partnerId && locationId) {
    // Geosafe returns 
    // {registrations: [{id: '', name: ''},...]}
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getLocationUpdateRegistration(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, locationId, partnerId, params } = req.payload as { authToken: string, locationId: string, partnerId: string, params: Object }

  if (authToken !== 'WrongAuthToken' && Object.keys(params).length != 0 && partnerId && locationId) {
    // Geosafe returns 
    // {registrations: [{id: '', name: ''},...]}
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getLocationListRegistrations(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, locationId } = req.payload as { authToken: string, locationId: string }

  if (authToken !== 'WrongAuthToken' && locationId) {
    // Geosafe returns 
    // {registrations: [{id: '', name: ''},...]}
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = { getLocationRegisterToPartner, getLocationUnregisterFromPartner, getLocationUpdateRegistration, getLocationListRegistrations }