const alertTypeMap = {
  'Severe Flood Warning': 'ALERT_LVL_1',
  'Systems Update Severe Flood Warning': 'ALERT_LVL_1',
  'Remove Severe Flood Warning': 'ALERT_LVL_1',
  'Flood Warning': 'ALERT_LVL_2',
  'Systems Update Flood Warning': 'ALERT_LVL_2',
  'Remove Flood Warning': 'ALERT_LVL_2',
  'Flood Alert': 'ALERT_LVL_3',
  'Systems Update Flood Alert': 'ALERT_LVL_3',
  'Remove Flood Alert': 'ALERT_LVL_3'
}

function parseApprovedDate(dateStr) {
  const [datePart, timePart] = dateStr.split(' ')
  const [day, month, year] = datePart.split('/').map(Number)
  const [hours, minutes, seconds] = timePart.split(':').map(Number)

  return new Date(year, month - 1, day, hours, minutes, seconds)
}

const createAlertObject = (startAlert, endAlert) => {
  return {
    id: '1',
    version: 'historic',
    name: startAlert['TA Name'],
    description: startAlert['lookup description'],
    startDate: parseApprovedDate(startAlert['Approved']),
    endDate: parseApprovedDate(endAlert['Approved']),
    TA_CODE: startAlert['TA Code'],
    TA_Name: startAlert['TA Name'],
    category: startAlert['lookup category'],
    type: alertTypeMap[startAlert['Message Type']]
  }
}

const issueMessages = ['Severe Flood Warning', 'Flood Warning', 'Flood Alert']

const mergeHistoricFloodEntries = (alerts) => {
  const historicAlerts = []

  // start from the last entry and work upwards (we need to merge starting and closing entries as one)
  for (let i = alerts.length - 1; i >= 0; i--) {
    const currentAlert = alerts[i]

    if (issueMessages.includes(currentAlert['Message Type'])) {
      const currentTACode = currentAlert['TA Code']

      let lastValidAlert = currentAlert

      // look for next alert entry with the same TA Code
      for (let j = i - 1; j >= 0; j--) {
        const nextAlert = alerts[j]
        const nextTACode = nextAlert['TA Code']
        if (nextTACode === currentTACode) {
          if (nextAlert['Message Type'].toLowerCase().includes('update')) {
            if (
              alertTypeMap[nextAlert['Message Type']] !==
              alertTypeMap[lastValidAlert['Message Type']]
            ) {
              const historicalAlert = createAlertObject(
                lastValidAlert,
                nextAlert
              )
              historicAlerts.push(historicalAlert)
              lastValidAlert = nextAlert
            }
          } else if (
            nextAlert['Message Type'].toLowerCase().includes('remove')
          ) {
            const historicalAlert = createAlertObject(lastValidAlert, nextAlert)
            historicAlerts.push(historicalAlert)
            break
          }
        }
      }
    }
  }

  return { historicAlerts }
}

module.exports = { mergeHistoricFloodEntries }
