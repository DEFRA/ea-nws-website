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

const getAlerts = async (options) => {
  const allAlerts = []
  const alerts = await apiCall({ options: options }, 'alert/list')
  allAlerts.push(...alerts.data.alerts)
  const additionalAlerts = []
  if (alerts.data.total > 1000) {
    const fetchAlertsPromises = []
    const totalRecalls = Math.floor(alerts.data.total / 1000)
    let i = 1
    while (i <= totalRecalls) {
      options.offset = 1000 * i 
      fetchAlertsPromises.push(
        apiCall({ options: options }, 'alert/list')
      )
      i++
    }

    const results = await Promise.all(fetchAlertsPromises)
    results.forEach((response) => {
      additionalAlerts.push(...response.data.alerts)
    })
  }
  allAlerts.push(...additionalAlerts)
  return allAlerts
}

module.exports = [
  {
    method: ['POST'],
    path: '/api/alert/list',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { options, filterDate, historic, taCodes } = request.payload
        options.channels = ['WEBSITE_CHANNEL', 'MOBILE_APP']
        options.states = ['CURRENT', 'PAST']
        options.limit = 1000
        options.sort = [{
          fieldName: 'id',
          order: 'DESCENDING'
        }]
        let alerts
        let { liveAlerts, historicAlerts } = {liveAlerts:[], historicAlerts:[]}
        if (historic) {
          const { redis } = request.server.app
          let cachedHistoricAlerts = await getFloodHistory(redis)
          if (cachedHistoricAlerts === null) {
            // get alerts from geosafe
            alerts = await getAlerts(options)
            ;({liveAlerts, historicAlerts} = processGeosafeAlerts(
              alerts
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
        } else if (taCodes && taCodes.length > 0) {
          // get alerts from geosafe
          alerts = await getAlerts(options)
          ;({liveAlerts, historicAlerts} = processGeosafeAlerts(
            alerts
          ))
          // add alerts from file
          const fileHistoricAlerts = historicAlerts.concat(
            await getAllPastAlerts(request)
          )
          historicAlerts = historicAlerts.concat(fileHistoricAlerts)
          historicAlerts = historicAlerts.filter((alert) => 
            taCodes.includes(alert.TA_CODE)
          )
          liveAlerts = liveAlerts.filter((alert) => 
            taCodes.includes(alert.TA_CODE)
          )
        } else {
          alerts = await getAlerts(options)
          ;({liveAlerts, historicAlerts} = processGeosafeAlerts(
            alerts
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
