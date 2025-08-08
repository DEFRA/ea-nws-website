const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { isAfter } = require('date-fns')
const { processGeosafeAlerts } = require('./alertProcessing/mergeGeosafeAlerts')
const { getAllPastAlerts } = require('./alertProcessing/getHistoricAlerts')
const {
  setFloodHistory,
  getFloodHistory
} = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/alert/list',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { options, filterDate, historic } = request.payload
        options.channels = ['WEBSITE_CHANNEL', 'MOBILE_APP']
        options.states = ['CURRENT', 'PAST']
        let response
        let { liveAlerts, historicAlerts } = {liveAlerts:[], historicAlerts:[]}

        if (historic) {
          const { redis } = request.server.app
          let cachedHistoricAlerts = await getFloodHistory(redis)
          if (cachedHistoricAlerts === null) {
            // get alerts from geosafe
            response = await apiCall({ options: options }, 'alert/list')
            ;({liveAlerts, historicAlerts} = processGeosafeAlerts(
              response.data.alerts
            ))
            // add alerts from file
            const fileHistoricAlerts = historicAlerts.concat(
              await getAllPastAlerts(request)
            )
            historicAlerts = historicAlerts.concat(fileHistoricAlerts)

            await setFloodHistory(
              redis,
              historicAlerts.concat(fileHistoricAlerts)
            )
          } else {
            historicAlerts = cachedHistoricAlerts
          }
        } else {
          response = await apiCall({ options: options }, 'alert/list')
          ;({liveAlerts, historicAlerts} = processGeosafeAlerts(
            response.data.alerts
          ))
        }

        if (filterDate) {
          historicAlerts = historicAlerts.filter((alert) => {
            let date = alert.endDate
            return isAfter(date, filterDate)
          })
        }

        return h.response({
          status: 200,
          data: {
            liveAlerts,
            historicAlerts
          }
        })
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
