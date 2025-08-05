const getTACode = (alert) => {
  const placemark = alert.mode?.zoneDesc?.placemarks?.[0]
  if (!placemark) return null

  const taCodeInfo = placemark.extraInfo?.find((info) => info.key === 'TA_CODE')
  return taCodeInfo?.value?.s || null
}

const getTAName = (alert) => {
  const placemark = alert.mode?.zoneDesc?.placemarks?.[0]
  if (!placemark) return null

  const taNameInfo = placemark.extraInfo?.find((info) => info.key === 'TA_Name')
  return taNameInfo?.value?.s || null
}

const getTACategory = (alert) => {
  const placemark = alert.mode?.zoneDesc?.placemarks?.[0]
  if (!placemark) return null

  const taCategory = placemark.extraInfo?.find(
    (info) => info.key === 'category'
  )
  return taCategory?.value?.s || null
}

const createAlertObject = (startAlert, endAlert) => {
  return {
    id: startAlert.id,
    version: startAlert.version,
    name: startAlert.name,
    description: startAlert.description,
    startDate: new Date(startAlert.effectiveDate * 1000),
    endDate: new Date(endAlert.effectiveDate * 1000),
    TA_CODE: getTACode(startAlert),
    TA_Name: getTAName(startAlert),
    category: getTACategory(startAlert),
    type: startAlert.type
  }
}

const createAlertObjectUsingExpirationDate = (startAlert, endAlert) => {
  return {
    id: startAlert.id,
    version: startAlert.version,
    name: startAlert.name,
    description: startAlert.description,
    startDate: new Date(startAlert.effectiveDate * 1000),
    endDate: new Date(endAlert.expirationDate * 1000),
    TA_CODE: getTACode(startAlert),
    TA_Name: getTAName(startAlert),
    category: getTACategory(startAlert),
    type: startAlert.type
  }
}

const processGeosafeAlerts = (alerts) => {
  const historicAlerts = []
  const liveAlerts = []
  for (let i = alerts.length - 1; i >= 0; i--) {
    const currentAlert = alerts[i]

    if (currentAlert.name.toLowerCase().includes('issue')) {
      const currentTACode = getTACode(currentAlert)
      if (!currentTACode) {
        continue
      }

      let alertEnded = false
      let lastValidAlert = currentAlert

      for (let j = i - 1; j >= 0; j--) {
        const nextAlert = alerts[j]
        const nextTACode = getTACode(nextAlert)

        if (nextTACode === currentTACode) {
          if (nextAlert.name.toLowerCase().includes('issue')) {
            const historicalAlert = createAlertObjectUsingExpirationDate(
              currentAlert,
              lastValidAlert
            )
            historicAlerts.push(historicalAlert)
            alertEnded = true
            break
          } else if (nextAlert.name.toLowerCase().includes('update')) {
            if (nextAlert.type !== lastValidAlert.type) {
              const historicalAlert = createAlertObject(
                lastValidAlert,
                nextAlert
              )
              historicAlerts.push(historicalAlert)
              lastValidAlert = nextAlert
            }
            // if type is same, continue without creating new alert object
          } else if (nextAlert.name.toLowerCase().includes('remove')) {
            const historicalAlert = createAlertObject(lastValidAlert, nextAlert)
            historicAlerts.push(historicalAlert)
            alertEnded = true
            break
          }
        }
      }

      // If no 'remove' message found, add to live alerts
      if (!alertEnded) {
        const alertExpiryDate = new Date(lastValidAlert.expirationDate * 1000)
        if (alertExpiryDate < new Date()) {
          const historicalAlert = createAlertObjectUsingExpirationDate(
            currentAlert,
            lastValidAlert
          )
          historicAlerts.push(historicalAlert)
        } else {
          const liveAlert = {
            id: lastValidAlert.id,
            version: lastValidAlert.version,
            name: lastValidAlert.name,
            description: lastValidAlert.description,
            startDate: new Date(lastValidAlert.effectiveDate * 1000),
            endDate: null,
            TA_CODE: getTACode(lastValidAlert),
            TA_Name: getTAName(lastValidAlert),
            category: getTACategory(lastValidAlert),
            type: lastValidAlert.type
          }
          liveAlerts.push(liveAlert)
        }
      }
    }
  }

  return {
    historicAlerts,
    liveAlerts
  }
}

module.exports = { processGeosafeAlerts }
