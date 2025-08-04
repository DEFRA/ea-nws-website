const { getWfsData } = require('../WfsData')
const turf = require('@turf/turf')

const wfsCallWithFilter = async (type, property, value) => {
  const filter = `<Filter><And><PropertyIsEqualTo><PropertyName>${property}</PropertyName><Literal>${value}</Literal></PropertyIsEqualTo></And></Filter>`
  const WFSParams = {
    service: 'WFS',
    map: 'uk-nfws.qgz',
    version: '1.1.0',
    request: 'GetFeature',
    typename: type,
    srsname: 'EPSG:4326',
    filter,
    outputFormat: 'GEOJSON'
  }
  const result = await getWfsData(WFSParams)
  return result
}

const getFloodAreaByTaCode = async (code) => {
  const { data: filteredWarningAreas } = await wfsCallWithFilter(
    'flood_warnings',
    'TA_CODE',
    code
  )
  const { data: filteredAlertAreas } = await wfsCallWithFilter(
    'flood_alerts',
    'TA_CODE',
    code
  )
  const alertAreasFeatures = filteredAlertAreas?.features || []
  const warningAreasFeatures = filteredWarningAreas?.features || []
  const allFilteredAreas = alertAreasFeatures.concat(warningAreasFeatures) || []
  // TA CODE is unique so the array will only contain one target area
  return allFilteredAreas[0] || []
}

const getOperationalBoundaryByTaCode = async (code) => {
  // describe feature types
  const WFSParamsObFeatures = {
    service: 'WFS',
    map: 'uk-ob.qgz',
    version: '1.1.0',
    request: 'DescribeFeatureType',
    outputFormat: 'GEOJSON'
  }

  const { data: wfsFeatureTypes } = await getWfsData(WFSParamsObFeatures)

  const boundaryTypes = wfsFeatureTypes.featureTypes.map((featureType) => {
    return featureType.typeName
  })

  let result = null
  for (const type of boundaryTypes) {
    const filter = `<Filter><And><PropertyIsEqualTo><PropertyName>TA_CODE</PropertyName><Literal>${code}</Literal></PropertyIsEqualTo></And></Filter>`

    const WFSParams = {
      service: 'WFS',
      map: 'uk-ob.qgz',
      version: '1.1.0',
      request: 'GetFeature',
      typename: type,
      srsname: 'EPSG:4326',
      filter,
      outputFormat: 'GEOJSON'
    }

    const { data: operationalBoundary } = await getWfsData(WFSParams)

    if (operationalBoundary?.features?.length > 0) {
      result = operationalBoundary.features[0]
      break
    }
  }

  return result
}

const wfsCall = async (bbox, map, type) => {
  const WFSParams = {
    service: 'WFS',
    map,
    version: '1.1.0',
    request: 'GetFeature',
    typename: type,
    srsname: 'EPSG:4326',
    bbox,
    outputFormat: 'GEOJSON'
  }
  const result = await getWfsData(WFSParams)
  return result
}

const getLocationsNearbyRiversAndSeaFloodAreas = async (
  lat,
  lng,
  bboxKM = 0.001
) => {
  const center = turf.point([lng, lat], { crs: 'EPSG:4326' })
  const buffered = turf.buffer(center, 0.001)
  const bbox = turf.bbox(buffered)
  const formattedbbox =
    bbox[0] + ',' + bbox[1] + ',' + bbox[2] + ',' + bbox[3] + ',EPSG:4326'
  const { data: riversAndSeaFloodRiskData } = await wfsCall(
    formattedbbox,
    'uk-rs.qgz',
    'risk-rivers-sea'
  )
  return riversAndSeaFloodRiskData
}

const getLocationsNearbyGroundWaterFloodAreas = async (
  lat,
  lng,
  bboxKM = 0.001
) => {
  const center = turf.point([lng, lat], { crs: 'EPSG:4326' })
  const buffered = turf.buffer(center, 0.001)
  const bbox = turf.bbox(buffered)
  const formattedbbox =
    bbox[0] + ',' + bbox[1] + ',' + bbox[2] + ',' + bbox[3] + ',EPSG:4326'
  const { data: groundwaterFloodRiskData } = await wfsCall(
    formattedbbox,
    'uk-gf.qgz',
    'groundwater-flood-risk'
  )
  return groundwaterFloodRiskData
}

function getHighestRiskRating(areas, ratingOrder, propertyToCheck) {
  // if there are no areas nearby, set to lowest risk rating
  let highestRating = null
  areas?.forEach((area) => {
    const rating = area.properties?.[propertyToCheck].toLowerCase()
    if (
      ratingOrder[rating] > (highestRating ? ratingOrder[highestRating] : 0)
    ) {
      highestRating = rating
    }
  })
  return highestRating
}

const getRiversAndSeaFloodRiskRatingOfLocation = async (lat, lng) => {
  const data = await getLocationsNearbyRiversAndSeaFloodAreas(lat, lng)

  const ratingOrder = {
    'very low': 1,
    low: 2,
    medium: 3,
    high: 4
  }

  if (data) {
    if (data.features && data.features.length > 0) {
      return getHighestRiskRating(data.features, ratingOrder, 'prob_4band')
    } else {
      return 'very low'
    }
  } else {
    return 'unavailable'
  }
}

const getGroundwaterFloodRiskRatingOfLocation = async (lat, lng) => {
  const data = await getLocationsNearbyGroundWaterFloodAreas(lat, lng)

  const ratingOrder = {
    unlikely: 1,
    possible: 2
  }
  if (data) {
    if (data.features && data.features.length > 0) {
      return getHighestRiskRating(data.features, ratingOrder, 'FloodRisk')
    } else {
      return 'unlikely'
    }
  } else {
    return 'unavailable'
  }
}

const findTAs = async (lng, lat) => {
  const center = turf.point([lng, lat], { crs: 'EPSG:4326' })
  const buffered = turf.buffer(center, 0.001)
  const bbox = turf.bbox(buffered)
  const formattedbbox =
    bbox[0] + ',' + bbox[1] + ',' + bbox[2] + ',' + bbox[3] + ',EPSG:4326'

  const { data: wfsWarningData } = await wfsCall(
    formattedbbox,
    'uk-nfws.qgz',
    'flood_warnings'
  )
  const { data: wfsAlertData } = await wfsCall(
    formattedbbox,
    'uk-nfws.qgz',
    'flood_alerts'
  )

  const alertAreasFeatures = wfsAlertData?.features || []
  const warningAreasFeatures = wfsWarningData?.features || []
  const allAreas = alertAreasFeatures.concat(warningAreasFeatures) || []

  return allAreas
}

module.exports = {
  findTAs,
  getGroundwaterFloodRiskRatingOfLocation,
  getRiversAndSeaFloodRiskRatingOfLocation,
  getFloodAreaByTaCode,
  getOperationalBoundaryByTaCode
}
