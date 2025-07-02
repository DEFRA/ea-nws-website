const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const getSecretKeyValue = require('../../services/SecretsManager')
const { parse, isValid, isAfter } = require('date-fns')
const fetch = require('node-fetch')
const { getFloodHistory, setFloodHistory } = require('../../services/elasticache')

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

const createGeoSafeAlertObject = (historicData) => {
  return {
    id: '1',
    version: 1,
    name: historicData.name,
    description: { en: 'Flood', additionalLabels: [] },
    effectiveDate: Math.floor(new Date(historicData.createdDate).getTime() / 1000),
    expirationDate: Math.floor(new Date(historicData.createdDate).getTime() / 1000),
    duration: {},
    urgency: '',
    severity: '',
    certainty: '',
    mode: {
      zoneDesc: {
        name: '',
        placemarks: [
          {
            id: '',
            name: '',
            geometry: {
              rings: [],
              circles: [],
              polygons: []
            },
            geocodes: [],
            extraInfo: [
              {
                key: 'TA_CODE',
                value: { s: historicData.taCode }
              },
              {
                key: 'TA_Name',
                value: {
                  s: historicData.taName
                }
              },
              {
                key: 'category',
                value: {
                  s: historicData.type
                }
              },
              {
                key: 'createddate',
                value: {
                  s: historicData.createdDate
                }
              },
              {
                key: 'lastmodifieddate',
                value: {
                  s: historicData.endDate
                }
              }
            ]
          }
        ]
      }
    },
    channels: [{ channelId: '', placemarks: [0], countryCodes: [] }],
    type: historicData.type,
    sender: '',
    scope: 'PUBLIC',
    capStatus: '',
    categories: [''],
    eventType: {
      en: 'Flood',
      additionalLabels: []
    },
    eventCode: { domain: 'NWS', code: 'FLOOD' },
    execution: {},
    workspaceId: '1',
    workspaceName: 'National Workspace'
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
          name: currentType + currentTA
        }

        result.push(createGeoSafeAlertObject(newAlert))
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


const getAllPastAlerts = async(request) => {
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

    historicAlerts = response.data.alerts.concat(
      sortedHistoricFileData
    )
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
          response = getAllPastAlerts(request)
        } else {
          response = await apiCall({ options: options }, 'alert/list')
        }

        if (filterDate) {
          const dateFormat = 'dd/MM/yyyy HH:mm:ss'
          response.data.alerts = response.data.alerts.filter((alert) => {
            const rawDate = alert.effectiveDate
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
