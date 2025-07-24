const alertTypeMap = {
  'Severe Flood Warning': 'ALERT_LVL_1',
  'Systems Update Severe Flood Warning': 'ALERT_LVL_1',
  'Flood Warning': 'ALERT_LVL_2',
  'Systems Update Flood Warning': 'ALERT_LVL_2',
  'Flood Alert': 'ALERT_LVL_3'
}

const createAlertObject = (startAlert, endAlert) => {
  return {
    id: '1',
    version: 'historic',
    name: startAlert['TA Name'],
    description: startAlert['lookup description'],
    startDate: startAlert['Approved'],
    endDate: endAlert['Approved'],
    TA_CODE: startAlert['TA Code'],
    TA_Name: startAlert['TA Name'],
    category: startAlert['lookup category'],
    type: alertTypeMap[startAlert['Message Type']]
  }
}

const mergeHistoricFloodEntries = (alerts) => {
  const historicAlerts = []
  console.log('alerts', alerts.length)

  // start from the last entry and work upwards (we need to merge starting and closing entries as one)
  for (let i = alerts.length - 1; i >= 0; i--) {
    const currentAlert = alerts[i]
    const currentTACode = currentAlert['TA Code']
    if (!currentTACode) {
      continue
    }

    let alertEnded = false
    let lastValidAlert = currentAlert

    // look for next alert entry with the same TA Code
    for (let j = i - 1; j >= 0; j--) {
      const nextAlert = alerts[j]
      const nextTACode = nextAlert['TA Code']

      if (nextTACode === currentTACode) {
        if (nextAlert['Message Type'].toLowerCase().includes('update')) {
          if (
            alertTypeMap[nextAlert['Message Type']] !==
            alertTypeMap[currentAlert['Message']]
          ) {
            const historicalAlert = createAlertObject(lastValidAlert, nextAlert)
            console.log('adding to historic alerts')
            historicAlerts.push(historicalAlert)
            lastValidAlert = nextAlert
          }
        } else if (nextAlert['Message Type'].toLowerCase().includes('remove')) {
          const historicalAlert = createAlertObject(lastValidAlert, nextAlert)
          console.log('adding to historic alerts')
          historicAlerts.push(historicalAlert)
          alertEnded = true
          break
        }
      }
    }
  }

  return { historicAlerts }
}

module.exports = { mergeHistoricFloodEntries }
