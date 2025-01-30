const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'
const mockLiveAlerts = require('../mockLiveAlerts')

async function getAlertsList(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  // NEED TO ADD OPTIONS
  //   const {  options } = req.payload as {
  //     options: { contactId: string }
  //   }

  console.log('alerts', mockLiveAlerts.liveAlerts)

  return { alerts: mockLiveAlerts.liveAlerts }
}

async function getAlert(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  interface Alert {
    id: string
  }

  const { id } = req.payload as { id: string }

  if (id) {
    return mockLiveAlerts.filter((alert: Alert) => alert.id === id)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = { getAlert, getAlertsList }
