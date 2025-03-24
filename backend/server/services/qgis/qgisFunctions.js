import { getWfsData } from '../WfsData'

const turf = require('@turf/turf')

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
    const result = await getWfsData(WFSParams, 'api/wfs')
    return result
}

const getLocationsNearbyRiversAndSeaFloodAreas = async (lat, lng, bboxKM = 0.001) => {
    const { data: riversAndSeaFloodRiskData } = await wfsCall(
      calculateBoundingBox(lat, lng, bboxKM),
      'uk-rs.qgz',
      'risk-rivers-sea'
    )
    return riversAndSeaFloodRiskData
}
  
const getLocationsNearbyGroundWaterFloodAreas = async (lat, lng, bboxKM = 0.001) => {
    const { data: groundwaterFloodRiskData } = await wfsCall(
      calculateBoundingBox(lat, lng, bboxKM),
      'uk-gf.qgz',
      'groundwater-flood-risk'
    )
    return groundwaterFloodRiskData
}

function getHighestRiskRating (areas, ratingOrder, propertyToCheck) {
    // if there are no areas nearby, set to lowest risk rating
    let highestRating = null
    areas?.forEach((area) => {
      const rating = area.properties?.[propertyToCheck].toLowerCase()
      if (ratingOrder[rating] > (highestRating ? ratingOrder[highestRating] : 0))
        {
        highestRating = rating
      }
    })
    return highestRating
}
  
  export const getRiversAndSeaFloodRiskRatingOfLocation = async (lat, lng) => {
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
  
  export const getGroundwaterFloodRiskRatingOfLocation = async (lat, lng) => {
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
  

export const findTAs = async (lng, lat) => {
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