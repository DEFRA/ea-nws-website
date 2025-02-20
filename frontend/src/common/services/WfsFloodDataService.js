import * as turf from '@turf/turf'
import L from 'leaflet'
import leafletPip from 'leaflet-pip'
import { backendCall } from './BackendService'

const wfsCall = async (bbox, type) => {
  const WFSParams = {
    service: 'WFS',
    map: 'uk-nfws.qgz',
    version: '1.1.0',
    request: 'GetFeature',
    typename: type,
    srsname: 'EPSG:4326',
    bbox,
    outputFormat: 'GEOJSON'
  }
  const result = await backendCall(WFSParams, 'api/wfs')
  return result
}

export const getFloodAreas = async (lat, lng) => {
  const { alertAreas, warningAreas } = await getSurroundingFloodAreas(lat, lng)
  const alertAreasFeatures = alertAreas?.features || []
  const warningAreasFeatures = warningAreas?.features || []
  const allAreas = alertAreasFeatures.concat(warningAreasFeatures) || []
  const withinAreas = []
  for (const feature of allAreas) {
    if (turf.booleanPointInPolygon([lng, lat], feature)) {
      withinAreas.push(feature)
    }
  }
  return withinAreas
}

export const getFloodAreasFromShape = async (geoJsonShape) => {
  // Add a buffer zone around the shape
  const bufferedShape = turf.buffer(geoJsonShape.geometry, 0.5, { units: 'kilometers' })
  // Get the boundary box for the buffered shape - it will be a square
  const bbox = turf.bbox(bufferedShape)
  const bboxInput =
    bbox[0] + ',' + bbox[1] + ',' + bbox[2] + ',' + bbox[3] + ',EPSG:4326'
  // warning areas
  const { data: wfsWarningData } = await wfsCall(bboxInput, 'flood_warnings')
  const { data: wfsAlertData } = await wfsCall(bboxInput, 'flood_alerts')
  // We only want intersections from the current shape to get areas within
  const filteredWarningData = getIntersections(wfsWarningData, geoJsonShape)
  const filteredAlertData = getIntersections(wfsAlertData, geoJsonShape)
  const filteredWarningDataFeatures = filteredWarningData?.features || []
  const filteredAlertDataFeatures = filteredAlertData?.features || []
  const withinAreas = filteredWarningDataFeatures.concat(filteredAlertDataFeatures)

  return withinAreas
}

export const getSurroundingFloodAreas = async (lat, lng, bboxKM = 0.5) => {
  // warning areas
  const { data: wfsWarningData } = await wfsCall(calculateBoundingBox(lat, lng, bboxKM), 'flood_warnings')
  // alert area
  const { data: wfsAlertData } = await wfsCall(calculateBoundingBox(lat, lng, bboxKM), 'flood_alerts')
  return {
    alertArea: wfsAlertData,
    warningArea: wfsWarningData
  }
}

export const getSurroundingFloodAreasFromShape = async (
  geoJsonShape,
  bboxKM = 0.5
) => {
  // Add a buffer zone around the shape
  const bufferedShape = turf.buffer(geoJsonShape.geometry, bboxKM, {
    units: 'kilometers'
  })
  // Get the boundary box for the buffered shape - it will be a square
  const bbox = turf.bbox(bufferedShape)
  const bboxInput =
    bbox[0] + ',' + bbox[1] + ',' + bbox[2] + ',' + bbox[3] + ',EPSG:4326'
  // warning areas
  const { data: wfsWarningData } = await wfsCall(bboxInput, 'flood_warnings')
  // As the surrounding areas will be for square box, it might return data that is irrelevant to the original shape: we need to filter it
  const filteredWarningData = getIntersections(wfsWarningData, bufferedShape)
  // alert area
  const { data: wfsAlertData } = await wfsCall(bboxInput, 'flood_alerts')
  const filteredAlertData = getIntersections(wfsAlertData, bufferedShape)
  return {
    alertArea: filteredAlertData,
    warningArea: filteredWarningData
  }
}

const getIntersections = (areas, bufferedShape) => {
  const bufferedShapeValid = turf.booleanValid(bufferedShape.geometry)
  if (!bufferedShapeValid) return
  const bufferedShapeGeometry = bufferedShape.geometry
  const filteredTargetData = areas.features.filter((area) => {
    if (turf.booleanValid(area.geometry)) {
      try {
        return turf.booleanIntersects(area.geometry, bufferedShapeGeometry)
      } catch (e) {
        console.error('Error during intersection', e)
        return false
      }
    } else return false
  })
  return filteredTargetData
}

export const getAssociatedAlertArea = async (lat, lng, code) => {
  const bboxKM = 0.5 // size of bounding box from centre in KM

  // alert area
  const { data: wfsAlertData } = await wfsCall(
    calculateBoundingBox(lat, lng, bboxKM),
    'flood_alerts'
  )

  const filteredOutOtherAlertAreas = wfsAlertData?.features.filter(
    (floodArea) => floodArea.properties.TA_CODE === code
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

function getFirstCoordinates (nestedArray) {
  let current = nestedArray
  while (Array.isArray(current[0])) {
    current = current[0]
  }
  return { latitude: current[1], longitude: current[0] }
}

function checkPointInPolygon (lat, lng, geojson) {
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

function calculateBoundingBox (centerLat, centerLng, distanceKm) {
  const center = turf.point([centerLng, centerLat], { crs: 'EPSG:4326' })
  const buffered = turf.buffer(center, distanceKm * 1000, { units: 'meters' })
  const bbox = turf.bbox(buffered)

  const result =
    bbox[0] + ',' + bbox[1] + ',' + bbox[2] + ',' + bbox[3] + ',EPSG:4326'

  return result
}

export const getLocationsNearbyRiversAndSeaFloodAreas = async (
  lat,
  lng,
  bboxKM = 0.5
) => {
  const { data: riversAndSeaFloodRiskData } = await wfsCall(
    calculateBoundingBox(lat, lng, bboxKM),
    'risk-rivers-sea'
  )

  return riversAndSeaFloodRiskData
}

export const getLocationsNearbyGroundWaterFloodAreas = async (
  lat,
  lng,
  bboxKM = 0.5
) => {
  const { data: groundwaterFloodRiskData } = await wfsCall(
    calculateBoundingBox(lat, lng, bboxKM),
    'groundwater-flood-risk'
  )

  return groundwaterFloodRiskData
}

export const getRiversAndSeaFloodRiskRatingOfLocation = async (lat, lng) => {
  const data = await getLocationsNearbyRiversAndSeaFloodAreas(lat, lng)

  const ratingOrder = {
    'v.low': 1,
    low: 2,
    medium: 3,
    high: 4
  }

  if (data) {
    if (data.features && data.features.length > 0) {
      return getHighestRiskRating(data.features, ratingOrder)
    } else {
      return 'v.low'
    }
  } else {
    return 'unavailable'
  }
}

export const getGroundwaterFloodRiskRatingOfLocation = async (lat, lng) => {
  const data = await getLocationsNearbyGroundWaterFloodAreas(lat, lng)

  const ratingOrder = {
    unlikely: 1,
    possible: 2
  }
  if (data) {
    if (data.features && data.features.length > 0) {
      return getHighestRiskRating(data.features, ratingOrder)
    } else {
      return 'unlikely'
    }
  } else {
    return 'unavailable'
  }
}

function getHighestRiskRating (areas, ratingOrder) {
  // if there are no areas nearby, set to lowest risk rating
  let highestRating = null

  areas?.forEach((area) => {
    const rating = area.properties?.prob_4band.toLowerCase()

    if (
      ratingOrder[rating] > (highestRating ? ratingOrder[highestRating] : 0)
    ) {
      highestRating = rating
    }
  })

  return highestRating
}

export const getBoundaryTypes = async () => {
  // describe feature types
  const WFSParams = {
    service: 'WFS',
    map: 'uk-ob.qgz',
    version: '1.1.0',
    request: 'DescribeFeatureType',
    outputFormat: 'GEOJSON'
  }

  const { data: wfsFeatureTypes } = await backendCall(WFSParams, 'api/wfs')

  return wfsFeatureTypes.featureTypes.map((featureType) => {
    return featureType.typeName
  })
}

export const getBoundaries = async (name) => {
  // get feature
  const WFSParams = {
    service: 'WFS',
    map: 'uk-ob.qgz',
    version: '1.1.0',
    request: 'GetFeature',
    typename: name,
    outputFormat: 'GEOJSON'
  }

  const { data: wfsBoundaries } = await backendCall(WFSParams, 'api/wfs')

  return wfsBoundaries
}
