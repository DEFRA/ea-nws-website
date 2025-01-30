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

  return { alerts: mockLiveAlerts.liveAlerts }
}
