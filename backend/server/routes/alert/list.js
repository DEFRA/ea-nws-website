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
  'Remove Severe Flood Warning',
  'Flood Warning',
  'Remove Flood Warning',
  'Flood Alert',
  'Remove Flood Alert'
]

const alertTypeMap = {
  'Severe Flood Warning': 'ALERT_LVL_1',
  'Flood Warning': 'ALERT_LVL_2',
  'Flood Alert': 'ALERT_LVL_3'
}

const alertRemovalMap = {
  'Severe Flood Warning': 'Remove Severe Flood Warning',
  'Flood Warning': 'Remove Flood Warning',
  'Flood Alert': 'Remove Flood Alert'
}

const getAdditional = (additionals, id) => {
  if (Array.isArray(additionals)) {
    for (let i = 0; i < additionals?.length; i++) {
      if (additionals[i].id === id) {
        return additionals[i].value?.s
      }
      if (additionals[i].key === id) {
        return additionals[i].value?.s
      }
    }
  } else {
    return additionals[id] || ''
  }
  return ''
}

const geosafeToWebAlertFormat = (alert) => {
  const TA_CODE = getAdditional(
    alert.mode.zoneDesc.placemarks[0].extraInfo,
    'TA_CODE'
  )
  const TA_Name = getAdditional(
    alert.mode.zoneDesc.placemarks[0].extraInfo,
    'TA_Name'
  )
  const category = getAdditional(
    alert.mode.zoneDesc.placemarks[0].extraInfo,
    'category'
  )
  return {
    id: alert.id,
    version: alert.version,
    name: alert.name,
    description: alert.description,
    effectiveDate: alert.effectiveDate,
    expirationDate: alert.expirationDate,
    TA_CODE: TA_CODE,
    TA_Name: TA_Name,
    category: category,
    type: alert.type
  }
}

const convertGeosafeAlerts = (alerts) => {
  const result = []
  alerts.forEach((alert) => {
    result.push(geosafeToWebAlertFormat(alert))
  })
  return result
}

const historicToWebAlertFormat = (historicData) => {
  return {
    id: '1',
    version: 1,
    name: historicData.name,
    description: { en: 'Flood', additionalLabels: [] },
    effectiveDate: Math.floor(new Date(historicData.endDate).getTime() / 1000),
    expirationDate: Math.floor(new Date(historicData.endDate).getTime() / 1000),
    TA_CODE: historicData.taCode,
    TA_Name: historicData.taName,
    category: historicData.type,
    type: historicData.type
  }
}

const mergeHistoricFloodEntries = (historicAlerts) => {
  const result = []
  const toRemove = new Set()

  // start from the last entry and work upwards (we need to merge starting and closing entries as one)
  for (let i = historicAlerts.length - 1; i >= 0; i--) {
    const currentEntry = historicAlerts[i]

    // skip entries that are not adding an entry
    if (
      !['Flood Alert', 'Flood Warning', 'Severe Flood Warning'].includes(
        currentEntry['Message Type']
      )
    ) {
      continue
    }

    const currentTA = currentEntry['TA Code']
    const currentType = currentEntry['Message Type']

    // look for next alert entry with the same TA Code (this is the entry which closed the alert)
    for (let j = i - 1; j >= 0; j--) {
      const nextEntry = historicAlerts[j]

      if (
        nextEntry['TA Code'] === currentTA &&
        nextEntry['Message Type'] === alertRemovalMap[currentType]
      ) {
        const newAlert = {
          taCode: currentEntry['TA Code'],
          taName: currentEntry['TA Name'],
          type: alertTypeMap[currentType],
          createdDate: currentEntry['Approved'],
          endDate: nextEntry['Approved'],
          name: nextEntry['Message Type'] + currentTA
        }

        result.push(historicToWebAlertFormat(newAlert))
        toRemove.add(i)
        toRemove.add(j)
        break
      }
    }
  }

  for (let i = historicAlerts.length - 1; i >= 0; i--) {
    if (toRemove.has(i)) {
      historicAlerts.splice(i, 1)
    }
  }

  return result
}

const getAllPastAlerts = async (request) => {
  const { redis } = request.server.app
  const { options } = request.payload
  let response
  // check elasticache for the flood history first
  let historicAlerts = await getFloodHistory(redis)
  if (historicAlerts === null) {
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

    const sortedHistoricFileData =
      mergeHistoricFloodEntries(floodHistoryFileData)

    // get past alerts from geosafe
    response = await apiCall({ options: options }, 'alert/list')
    const geoSafeAlerts = convertGeosafeAlerts(response.data.alerts)

    historicAlerts = geoSafeAlerts.concat(sortedHistoricFileData)
    response.data.alerts = historicAlerts

    await setFloodHistory(redis, historicAlerts)
  } else {
    response = {
      status: 200,
      data: {
        alerts: historicAlerts
      }
    }
  }

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
        if (historic) {
          response = await getAllPastAlerts(request)
        } else {
          response = await apiCall({ options: options }, 'alert/list')
          response.data.alerts = convertGeosafeAlerts(response.data.alerts)
        }

        if (filterDate) {
          const dateFormat = 'dd/MM/yyyy HH:mm:ss'
          response.data.alerts = response.data.alerts.filter((alert) => {
            let rawDate = alert.effectiveDate
            if (typeof rawDate !== 'number') {
              rawDate = 0
            }
            const formattedDate = format(new Date(rawDate * 1000), dateFormat)
            console.log('formattedDate', formattedDate)
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
