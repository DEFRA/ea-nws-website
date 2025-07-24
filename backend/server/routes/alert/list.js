const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const getSecretKeyValue = require('../../services/SecretsManager')
const { parse, isValid, isAfter, format } = require('date-fns')
const fetch = require('node-fetch')
const {
  getFloodHistory,
  setFloodHistory
} = require('../../services/elasticache')
const {
  mergeHistoricFloodEntries
} = require('./alertProcessing/mergeHistoricalAlerts')
const { processGeosafeAlerts } = require('./alertProcessing/mergeGeosafeAlerts')

const csvToJson = (text, quoteChar = '"', delimiter = ',') => {
  const rows = text.split(/\r?\n|\r|\n/g)
  const headers = rows[0].split(',')

  const regex = new RegExp(
    `\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`,
    'gs'
  )

  const match = (line) =>
    [...line.matchAll(regex)].map((m) => m[2]).slice(0, -1)

  let lines = text.split(/\r?\n|\r|\n/g)
  const heads = headers ?? match(lines.shift())
  lines = lines.slice(1)

  return lines.map((line) => {
    return match(line).reduce((acc, cur, i) => {
      // replace blank matches with `null`
      const val = cur.length <= 0 ? null : Number(cur) || cur
      const key = heads[i] ?? '{i}'
      return { ...acc, [key]: val }
    }, {})
  })
}

const allowedMessageTypes = [
  'Severe Flood Warning',
  'Systems Update Severe Flood Warning',
  'Remove Severe Flood Warning',
  'Flood Warning',
  'Systems Update Flood Warning',
  'Remove Flood Warning',
  'Flood Alert',
  'Remove Flood Alert'
]

const getAllPastAlerts = async (request) => {
  const { redis } = request.server.app
  let response
  // check elasticache for the flood history first
  // let historicAlerts = await getFloodHistory(redis)
  // console.log('elasticahce historicAlerts', historicAlerts.length)
  // if (historicAlerts === null) {
  let floodHistoryFileData
  // we need to load the historical data from file now
  const historicFloodDataUrl = await getSecretKeyValue(
    'nws/website',
    'organisationFloodHistoryUrl'
  )

  // if nothing is returned then we can assume the file has been deleted and only need to load the geosafe alerts
  if (historicFloodDataUrl) {
    await fetch(historicFloodDataUrl)
      .then((response) => response.text())
      .then((data) => {
        floodHistoryFileData = csvToJson(data)
      })
      .catch((e) =>
        console.error('Could not fetch Historic Flood Warning file', e)
      )
  }

  // filter out any updates - we only want to know when a flood alert was added and removed
  floodHistoryFileData = floodHistoryFileData.filter((item) =>
    allowedMessageTypes.includes(item['Message Type'])
  )

  console.log('about to process')

  const { historicAlerts } = mergeHistoricFloodEntries(floodHistoryFileData)

  console.log('sortedHistoricFileData', historicAlerts.length)

  // this needs updated to concat the geosafe alerts with historic ones

  response.data.alerts = sortedHistoricFileData

  await setFloodHistory(redis, historicAlerts)
  // } else {
  //   response = {
  //     status: 200,
  //     data: {
  //       alerts: historicAlerts
  //     }
  //   }
  // }

  return response
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

        const { options, filterDate, historic } = request.payload
        options.channels = ['WEBSITE_CHANNEL', 'MOBILE_APP']
        let response

        console.log('getting historic?', historic)

        if (historic) {
          response = await getAllPastAlerts(request)
        } else {
          response = await apiCall({ options: options }, 'alert/list')
          const { liveAlerts, historicAlerts } = processGeosafeAlerts(
            response.data.alerts
          )
          console.log('historicAlerts', historicAlerts)
          console.log('-------------------------------')
          console.log('liveAlerts', liveAlerts)
        }

        if (filterDate) {
          const dateFormat = 'dd/MM/yyyy HH:mm:ss'
          response.data.alerts = response.data.alerts.filter((alert) => {
            let rawDate = alert.effectiveDate
            if (typeof rawDate !== 'number') {
              rawDate = 0
            }
            const formattedDate = format(new Date(rawDate * 1000), dateFormat)
            let parsedDate = null
            const attempt = parse(formattedDate, dateFormat, new Date())
            if (isValid(attempt)) {
              parsedDate = attempt
            }

            return parsedDate && isAfter(parsedDate, filterDate)
          })
        }

        return h.response(response)
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
