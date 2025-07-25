const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { parse, isValid, isAfter, format } = require('date-fns')
const { processGeosafeAlerts } = require('./alertProcessing/mergeGeosafeAlerts')
const { getAllPastAlerts } = require('./alertProcessing/getHistoricAlerts')

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

        response = await apiCall({ options: options }, 'alert/list')
        let { liveAlerts, historicAlerts } = processGeosafeAlerts(
          response.data.alerts
        )
        // console.log('historicAlerts', historicAlerts)
        // console.log('historicAlerts size', historicAlerts.length)
        // console.log('-------------------------------')
        // console.log('liveAlerts', liveAlerts)

        if (historic) {
          console.log('getting historical alerts from file')
          // add alerts from historic file
          historicAlerts = historicAlerts.concat(
            await getAllPastAlerts(request)
          )
        }

        console.log('-------------------------------')
        console.log('historicAlerts size', historicAlerts.length)

        if (filterDate) {
          console.log('filtering by date ', filterDate)
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
