const {
  getFloodHistory,
  setFloodHistory
} = require('../../../services/elasticache')
const fetch = require('node-fetch')
const getSecretKeyValue = require('../../../services/SecretsManager')
const { mergeHistoricFloodEntries } = require('./mergeHistoricalAlerts')

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
  // let historicAlerts = await getFloodHistory(redis)
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

  const { historicAlerts } = mergeHistoricFloodEntries(floodHistoryFileData)
  console.log('historical alert example', historicAlerts[0])

  await setFloodHistory(redis, historicAlerts)

  console.log('processed historic alerts', historicAlerts.length)
  return historicAlerts
  // } else {
  //   console.log(
  //     'getting historic alerts via elasticahce',
  //     historicAlerts.length
  //   )
  //   return historicAlerts
  // }
}

module.exports = { getAllPastAlerts }
