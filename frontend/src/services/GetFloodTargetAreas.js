import L from 'leaflet'
import leafletPip from 'leaflet-pip'

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

  //check if location entered is in target area
  const isInWarningArea = checkPointInPolygon(lat, lng, wfsWarningData)
  const isInAlertArea = checkPointInPolygon(lat, lng, wfsAlertData)

  return {
    alertArea: wfsAlertData,
    warningArea: wfsWarningData,
    isInWarningArea,
    isInAlertArea
  }
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

function checkPointInPolygon(lat, lng, geojson) {
  const point = L.latLng(lat, lng)

  // Check each area in the GeoJSON data
  for (const feature of geojson.features) {
    const layer = L.geoJSON(feature)
    // Use leaflet-pip to check if the point is inside the polygon
    const results = leafletPip.pointInLayer(point, layer)

    if (results.length > 0) {
      return true
    }
  }

  return false
}
