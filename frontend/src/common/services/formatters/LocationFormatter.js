const geoSafeToWebLocation = (geoSafeLocation) => {
  const location = {
    id: geoSafeLocation?.id,
    enabled: geoSafeLocation?.enabled,
    name: geoSafeLocation?.name,
    address: geoSafeLocation?.address,
    coordinates: geoSafeLocation?.coordinates,
    geometry: geoSafeLocation?.geometry,
    geocode: geoSafeLocation?.geocode,
    additionals: {
      locationName: null,
      parentID: null,
      targetAreas: null,
      keywords: null,
      other: null
    }
  }

  if (location?.geometry?.geoJson) {
    location.geometry.geoJson = JSON.parse(location?.geometry?.geoJson)
  }

  const additionals = geoSafeLocation?.additionals
  additionals?.forEach((additional) => {
    if (additional.id === 'keywords') {
      let keywords
      try {
        keywords = JSON.parse(additional.value?.s)
      } catch (e) {
        keywords = []
      }
      location.additionals.keywords = keywords
    } else if (additional.id === 'other') {
      location.additionals.other = JSON.parse(additional.value?.s)
    } else {
      location.additionals[additional.id] = additional.value?.s
    }
  })

  return location
}

const webToGeoSafeLocation = (webLocation) => {
  const location = {
    id: webLocation.id,
    enabled: webLocation.enabled,
    name: webLocation.name,
    address: webLocation.address,
    coordinates: webLocation.coordinates,
    geometry: webLocation.geometry,
    geocode: webLocation.geocode,
    additionals: [
      {
        id: 'locationName',
        value: { s: webLocation.additionals?.locationName }
      },
      { id: 'parentID', value: { s: webLocation.additionals?.parentID } },
      { id: 'targetAreas', value: { s: webLocation.additionals?.targetAreas } },
      {
        id: 'keywords',
        value: { s: JSON.stringify(webLocation.additionals?.keywords) }
      },
      {
        id: 'other',
        value: {
          s: JSON.stringify(webLocation.additionals?.other)
        }
      }
    ]
  }

  if (location?.geometry?.geoJson) {
    location.geometry.geoJson = JSON.stringify(location?.geometry?.geoJson)
  }
  
  return location
}

module.exports = { webToGeoSafeLocation, geoSafeToWebLocation }
