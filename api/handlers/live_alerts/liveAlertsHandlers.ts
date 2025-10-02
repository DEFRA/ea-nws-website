const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'
const mockAlerts = require('../mockAlerts')

async function getAlertsList(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { options } = req.payload as {
    options: { contactId: string; states: Array<string> }
  }

  return {
    alerts: mockAlerts.alerts,
    total: mockAlerts.alertsTotal
  }
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
    return mockAlerts.filter((alert: Alert) => alert.id === id)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = { getAlert, getAlertsList }
