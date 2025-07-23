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
    startDate: startAlert.effectiveDate,
    endDate: endAlert.effectiveDate,
    TA_CODE: getTACode(startAlert),
    TA_Name: getTAName(startAlert),
    category: getTACategory(startAlert),
    type: startAlert.type
  }
}

const processGeosafeAlerts = (alerts) => {
  const historicAlerts = []
  const liveAlerts = []
  const messages = alerts.alerts

  let firstPointer = messages.length - 1

  while (firstPointer >= 0) {
    const currentAlert = messages[firstPointer]

    if (currentAlert.name.toLowerCase().includes('issue')) {
      const currentTACode = getTACode(currentAlert)
      if (!currentTACode) {
        firstPointer--
        continue
      }

      let secondPointer = firstPointer - 1
      let alertEnded = false
      let lastValidAlert = currentAlert

      while (secondPointer >= 0) {
        const nextAlert = messages[secondPointer]
        const nextTACode = getTACode(nextAlert)

        if (nextTACode === currentTACode) {
          if (nextAlert.name.toLowerCase().includes('update')) {
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

        secondPointer--
      }

      // If no 'remove' message found, add to live alerts
      if (!alertEnded) {
        const liveAlert = {
          id: lastValidAlert.id,
          version: lastValidAlert.version,
          name: lastValidAlert.name,
          description: lastValidAlert.description,
          startDate: lastValidAlert.effectiveDate,
          endDate: lastValidAlert.effectiveDate,
          TA_CODE: getTACode(lastValidAlert),
          TA_Name: getTAName(lastValidAlert),
          category: getTACategory(lastValidAlert),
          type: lastValidAlert.type
        }
        liveAlerts.push(liveAlert)
      }
    }

    firstPointer--
  }

  return {
    historicAlerts,
    liveAlerts
  }
}

module.exports = { processGeosafeAlerts }
