import * as turf from '@turf/turf'
import L from 'leaflet'
import leafletPip from 'leaflet-pip'

export const getSurroundingFloodAreas = async (lat, lng, bboxKM = 0.5) => {
  // const bboxKM = 0.5 // size of bounding box from centre in KM

  // warning areas
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

  // alert area
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

  return {
    alertArea: wfsAlertData,
    warningArea: wfsWarningData
  }
}

export const getAssociatedAlertArea = async (lat, lng, code) => {
  const bboxKM = 0.5 // size of bounding box from centre in KM

  // alert area
  const baseWFSURL =
    'https://environment.data.gov.uk/spatialdata/flood-alert-areas/wfs'
  const WFSParams = {
    service: 'WFS',
    version: '2.0.0',
    request: 'GetFeature',
    typename: 'Flood_Alert_Areas',
    srsname: 'EPSG:4326',
    bbox: calculateBoundingBox(lat, lng, bboxKM),
    outputFormat: 'GEOJSON'
  }
  const wfsURL = `${baseWFSURL}?${new URLSearchParams(WFSParams).toString()}`
  const wfsAlertData = await fetch(wfsURL).then((response) => response.json())

  const filteredOutOtherAlertAreas = wfsAlertData.features.filter(
    (floodArea) => floodArea.properties.fws_tacode === code
  )
  if (filteredOutOtherAlertAreas.length > 0) {
    return filteredOutOtherAlertAreas[0]
  }
}

export const isLocationInFloodArea = (lat, lng, areaData) => {
  // check if location entered is in target area
  const isInFloodArea = checkPointInPolygon(lat, lng, areaData)

  return isInFloodArea
}

// update to get distance to flood areas
export const isLocationWithinFloodAreaProximity = (
  lat,
  lng,
  floodAreaData,
  distanceMetres
) => {
  const point = turf.point([lng, lat])
  const maxDistance = distanceMetres

  // load polygons and loop through each area until true is returned
  const isWithinFloodAreaProximity = floodAreaData.features.some((feature) => {
    const floodArea = turf.multiPolygon(feature.geometry.coordinates)

    // return all positions in area
    const floodAreaEdges = turf.explode(floodArea)

    // loop through every position and check location is not within proximity of flood area
    return floodAreaEdges.features.some((edge) => {
      const floodAreaEdge = turf.point(edge.geometry.coordinates)
      const distance = turf.distance(point, floodAreaEdge, { units: 'meters' })
      return distance <= maxDistance
    })
  })

  return {
    isWithinFloodAreaProximity
  }
}

export const getCoordsOfFloodArea = (area) => {
  const firstLatLngCoords = getFirstCoordinates(area.geometry.coordinates)

  return firstLatLngCoords
}

function getFirstCoordinates(nestedArray) {
  let current = nestedArray
  while (Array.isArray(current[0])) {
    current = current[0]
  }
  return { latitude: current[1], longitude: current[0] }
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
