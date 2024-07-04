export const getFloodTargetArea = async (lat, lng) => {
  const bboxKM = 1 //size of bounding box from centre in KM

  //warning areas
  let baseWFSURL =
    'https://environment.data.gov.uk/spatialdata/flood-warning-areas/wfs'
  let WFSParams = {
    service: 'WFS',
    version: '2.0.0',
    request: 'GetFeature',
    typename: 'Flood_Warning_Areas',
    srsname: 'EPSG:4326',
    bbox: calculateBoundingBox(lat, lng, bboxKM),
    outputFormat: 'GEOJSON'
  }
  let wfsURL = `${baseWFSURL}?${new URLSearchParams(WFSParams).toString()}`
  const wfsWarningData = await fetch(wfsURL).then((response) => response.json())

  console.log('wfsWarningData', wfsWarningData)

  //alert area
  baseWFSURL =
    'https://environment.data.gov.uk/spatialdata/flood-alert-areas/wfs'
  WFSParams = {
    service: 'WFS',
    version: '2.0.0',
    request: 'GetFeature',
    typename: 'Flood_Alert_Areas',
    srsname: 'EPSG:4326',
    bbox: calculateBoundingBox(lat, lng, bboxKM),
    outputFormat: 'GEOJSON'
  }
  wfsURL = `${baseWFSURL}?${new URLSearchParams(WFSParams).toString()}`
  const wfsAlertData = await fetch(wfsURL).then((response) => response.json())

  console.log('wfsAlertData', wfsAlertData)

  return { alertArea: wfsAlertData, warningArea: wfsWarningData }
}

function calculateBoundingBox(centerLat, centerLng, distanceKm) {
  const EARTH_RADIUS_KM = 6371 // Earth radius in kilometers

  // Convert center latitude and longitude to radians
  const centerLatRad = (Math.PI / 180) * centerLat
  //   const centerLngRad = (Math.PI / 180) * centerLng

  // Calculate the latitude difference (in radians) for the given distance
  const latDiff = distanceKm / EARTH_RADIUS_KM

  // Calculate the bounding box coordinates
  const latMin = centerLat - (latDiff * 180) / Math.PI
  const latMax = centerLat + (latDiff * 180) / Math.PI
  const lngMin = centerLng - (latDiff * 180) / Math.PI / Math.cos(centerLatRad)
  const lngMax = centerLng + (latDiff * 180) / Math.PI / Math.cos(centerLatRad)

  const result =
    lngMin + ',' + latMin + ',' + lngMax + ',' + latMax + ',EPSG:4326'
  return result
}
