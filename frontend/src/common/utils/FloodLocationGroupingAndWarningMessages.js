import AlertType from '../enums/AlertType'

export const getGroupFloodLocation = (locations) => {
  const group = {}
  const locationCounts = {}

  locations.forEach((location) => {
    const locationAdditional = location.additionals.find(
      (add) => add.id === 'locationName'
    )
    if (locationAdditional) {
      const locationValue = locationAdditional.value.s
      locationCounts[locationValue] = (locationCounts[locationValue] || 0) + 1
    }
  })

  //add to group if appears more than once
  locations.forEach((location) => {
    const locationAdditional = location.additionals.find(
      (add) => add.id === 'locationName'
    )

    if (locationAdditional) {
      const locationValue = locationAdditional.value.s
      if (locationCounts[locationValue] > 1) {
        if (!group[locationValue]) {
          group[locationValue] = []
        }
        group[locationValue].push(location)
      }
    }
  })
  return group
}

export const getNonGroupFloodLocation = (locations) => {
  const nonGroup = []
  const groupLocations = getGroupFloodLocation(locations)
  const groupedLocationValues = new Set(Object.keys(groupLocations))

  locations.forEach((location) => {
    const hasLocationName = location.additionals.some(
      (add) => add.id === 'locationName'
    )

    if (!hasLocationName) {
      nonGroup.push(location)
    } else {
      const locationAdditional = location.additionals.find(
        (add) => add.id === 'locationName'
      )
      const locationValue = locationAdditional.value.s
      if (!groupedLocationValues.has(locationValue)) {
        nonGroup.push(location)
      }
    }
  })
  return nonGroup
}

export const getFloodWarningAndAlerts = (location, locationRegistrations) => {
  const alertTypes =
    locationRegistrations.find((loc) => loc.locationId == location.id)?.params
      ?.alertTypes || []

  let serverFloodWarnings = null
  let floodWarnings = null
  let floodAlerts = null

  if (!alertTypes.length) return ''

  serverFloodWarnings = alertTypes.includes(AlertType.SEVERE_FLOOD_WARNING)
  floodWarnings = alertTypes.includes(AlertType.FLOOD_WARNING)
  floodAlerts = alertTypes.includes(AlertType.FLOOD_ALERT)

  if (serverFloodWarnings && floodWarnings && floodAlerts) {
    return 'Severe flood warnings, flood warnings and flood alerts'
  }

  if (serverFloodWarnings && floodWarnings) {
    return 'Severe flood warnings and flood warnings'
  }

  if (floodAlerts) {
    return 'Flood alerts'
  }
}
