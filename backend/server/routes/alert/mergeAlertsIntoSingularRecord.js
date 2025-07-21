const alertRemovalMap = {
  'Severe Flood Warning': 'Remove Severe Flood Warning',
  'Flood Warning': 'Remove Flood Warning',
  'Flood Alert': 'Remove Flood Alert'
}

const mergeHistoricFloodEntries = (alerts) => {
  const result = []
  const toRemove = new Set()

  // start from the last entry and work upwards (we need to merge starting and closing entries as one)
  for (let i = alerts.length - 1; i >= 0; i--) {
    const currentEntry = alerts[i]

    // skip entries that are not adding an entry
    if (
      !['Flood Alert', 'Flood Warning', 'Severe Flood Warning'].includes(
        currentEntry.message_type
      )
    ) {
      continue
    }

    const currentTA = currentEntry.TA_CODE
    const currentType = currentEntry.ype

    // look for next alert entry with the same TA Code (this is the entry which closed the alert)
    for (let j = i - 1; j >= 0; j--) {
      const nextEntry = alerts[j]

      if (
        nextEntry.TA_CODE === currentTA &&
        nextEntry.message_type === alertRemovalMap[currentType]
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
