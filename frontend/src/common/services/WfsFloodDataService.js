import * as turf from '@turf/turf'
import L from 'leaflet'
import leafletPip from 'leaflet-pip'
import LocationDataType from '../enums/LocationDataType'
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

export const getSurroundingFloodAreasFromShape = async (geoJsonShape, bboxKM = 0.5) => {
  const bufferedShape = turf.buffer(geoJsonShape.geometry, bboxKM, { units: 'kilometers' })
  const bbox = turf.bbox(bufferedShape)
  const bboxInput =
    bbox[0] + ',' + bbox[1] + ',' + bbox[2] + ',' + bbox[3] + ',EPSG:4326'
  // warning areas
  let WFSParams = {
    service: 'WFS',
    map: 'uk-nfws.qgz',
    version: '1.1.0',
    request: 'GetFeature',
    typename: 'flood_warnings',
    srsname: 'EPSG:4326',
    bbox: bboxInput,
    outputFormat: 'GEOJSON'
  }

  const { data: wfsWarningData } = await backendCall(WFSParams, 'api/wfs')
  const filteredWarningData = getIntersections(wfsWarningData, bufferedShape)
  // alert area
  WFSParams = {
    service: 'WFS',
    map: 'uk-nfws.qgz',
    version: '1.1.0',
    request: 'GetFeature',
    typename: 'flood_alerts',
    srsname: 'EPSG:4326',
    bbox: bboxInput,
    outputFormat: 'GEOJSON'
  }
  const { data: wfsAlertData } = await backendCall(WFSParams, 'api/wfs')
  const filteredAlertData = getIntersections(wfsAlertData, bufferedShape)
  
  return {
    alertArea: filteredAlertData,
    warningArea: filteredWarningData
  }
}

const getIntersections = (areas, bufferedShape) => {
  const bufferedShapeValid = turf.booleanValid(bufferedShape.geometry)
  const filteredTargetData = areas.features.filter(area => {
    if(turf.booleanValid(area.geometry) && bufferedShapeValid){
      try{ 
        if(area.geometry.type === LocationDataType.SHAPE_LINE){
          if(turf.lineIntersect(area.geometry, bufferedShape.geometry)) return true
        }
        const poly1 = turf.multiPolygon(bufferedShape.geometry.coordinates) 
        const poly2 = turf.multiPolygon(area.geometry.coordinates) 
        const featureCollection = turf.featureCollection([poly1,poly2])  
        if(turf.intersect(featureCollection)) return true
      }
      catch(e){
        console.error('Error during intersection', e)
      }
      return false
    }   
  })
  return filteredTargetData
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
  const WFSParams = {
    service: 'WFS',
    map: 'uk-rs.qgz',
    version: '1.1.0',
    request: 'GetFeature',
    typename: 'risk-rivers-sea',
    srsname: 'EPSG:4326',
    bbox: calculateBoundingBox(lat, lng, bboxKM),
    outputFormat: 'GEOJSON'
  }

  const { data: riversAndSeaFloodRiskData } = await backendCall(
    WFSParams,
    'api/wfs'
  )

  return riversAndSeaFloodRiskData
}

export const getLocationsNearbyGroundWaterFloodAreas = async (
  lat,
  lng,
  bboxKM = 0.5
) => {
  const WFSParams = {
    service: 'WFS',
    map: 'uk-gf.qgz',
    version: '1.1.0',
    request: 'GetFeature',
    typename: 'groundwater-flood-risk',
    srsname: 'EPSG:4326',
    bbox: calculateBoundingBox(lat, lng, bboxKM),
    outputFormat: 'GEOJSON'
  }

  const { data: groundwaterFloodRiskData } = await backendCall(
    WFSParams,
    'api/wfs'
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
