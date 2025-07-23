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

module.exports = { mergeHistoricFloodEntries }
