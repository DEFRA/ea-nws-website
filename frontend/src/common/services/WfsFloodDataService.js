import * as turf from '@turf/turf'
import L from 'leaflet'
import leafletPip from 'leaflet-pip'
import { backendCall } from './BackendService'

export const getSurroundingFloodAreas = async (lat, lng, bboxKM = 0.5) => {
  // warning areas
  let WFSParams = {
    service: 'WFS',
    map: 'uk-nfws.qgz',
    version: '1.1.0',
    request: 'GetFeature',
    typename: 'flood_warnings',
    srsname: 'EPSG:4326',
    bbox: calculateBoundingBox(lat, lng, bboxKM),
    outputFormat: 'GEOJSON'
  }

  const { data: wfsWarningData } = await backendCall(WFSParams, 'api/wfs')

  // alert area
  WFSParams = {
    service: 'WFS',
    map: 'uk-nfws.qgz',
    version: '1.1.0',
    request: 'GetFeature',
    typename: 'flood_alerts',
    srsname: 'EPSG:4326',
    bbox: calculateBoundingBox(lat, lng, bboxKM),
    outputFormat: 'GEOJSON'
  }
  const { data: wfsAlertData } = await backendCall(WFSParams, 'api/wfs')

  return {
    alertArea: wfsAlertData,
    warningArea: wfsWarningData
  }
}

export const getAssociatedAlertArea = async (lat, lng, code) => {
  const bboxKM = 0.5 // size of bounding box from centre in KM

  // alert area
  const WFSParams = {
    service: 'WFS',
    map: 'uk-nfws.qgz',
    version: '1.1.0',
    request: 'GetFeature',
    typename: 'flood_alerts',
    srsname: 'EPSG:4326',
    bbox: calculateBoundingBox(lat, lng, bboxKM),
    outputFormat: 'GEOJSON'
  }
  const { data: wfsAlertData } = await backendCall(WFSParams, 'api/wfs')

  const filteredOutOtherAlertAreas = wfsAlertData?.features.filter(
    (floodArea) => floodArea.properties.FWS_TACODE === code
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
  const center = turf.point([centerLng, centerLat], { crs: 'EPSG:4326' })
  const buffered = turf.buffer(center, distanceKm * 1000, { units: 'meters' })
  const bbox = turf.bbox(buffered)

  const result =
    bbox[0] + ',' + bbox[1] + ',' + bbox[2] + ',' + bbox[3] + ',EPSG:4326'

  return result
}
