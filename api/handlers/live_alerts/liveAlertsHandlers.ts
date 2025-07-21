const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'
const mockLiveAlerts = require('../mockLiveAlerts')
const mockPastAlerts = require('../mockPastAlerts')

async function getAlertsList(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { options } = req.payload as {
    options: { contactId: string; states: Array<string> }
  }

  if (options?.states.includes('PAST')) {
    return {
      alerts: mockPastAlerts.pastAlerts.alerts,
      total: mockPastAlerts.pastAlerts.total
    }
  } else {
    return {
      alerts: mockLiveAlerts.liveAlerts.alerts,
      total: mockLiveAlerts.liveAlerts.total
    }
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
    return mockLiveAlerts.filter((alert: Alert) => alert.id === id)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = { getAlert, getAlertsList }
