const proj4 = require('proj4')
const { getGroundwaterFloodRiskRatingOfLocation, findTAs, getFloodAreasFromShape, getRiversAndSeaFloodRiskRatingOfLocation } = require('../qgis/qgisFunctions')

proj4.defs(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs'
  )
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs')

// Converts from EPSG:4326 (WGS 84) to EPSG:27700 (British National Grid)
const convertCoordinatesToEspg27700 = (longitude, latitude) => {
    const [easting, northing] = proj4('EPSG:4326', 'EPSG:27700', [
      longitude,
      latitude
    ])
    return { northing, easting }
}

const LocationDataType = {
    X_AND_Y_COORDS: 'xycoords',
    SHAPE_POLYGON: 'polygon',
    SHAPE_LINE: 'line',
    BOUNDARY: 'boundary'
}

function calculateLocationDataType (migratedLocation) {
    if (migratedLocation.geocode) return LocationDataType.BOUNDARY
    if (migratedLocation.geometry) return LocationDataType.SHAPE_POLYGON
    if (migratedLocation.coordinates) return LocationDataType.X_AND_Y_COORDS
    else return null
}

const getLocationOtherAdditional = (additionals, id) => {
    for (let i = 0; i < additionals.length; i++) {
      if (additionals[i].id === 'other') {
        const otherAdditionals = JSON.parse(additionals[i].value?.s)
        return otherAdditionals[id]
      }
    }
    return null
  }

const getAdditional = (additionals, id) => {
    if (Array.isArray(additionals)) {
      for (let i = 0; i < additionals?.length; i++) {
        if (additionals[i].id === id) {
          return additionals[i].value?.s
        }
        if (additionals[i].key === id) {
          return additionals[i].value?.s
        }
      }
    } else {
      return additionals[id] || null
    }
    return null
  }

async function getTAAndNaFra (migratedLocation, dataType) {
    const targetAreas = []
    let riverSeaRisk = ''
    let groundWaterRisk = ''
    if (dataType === LocationDataType.X_AND_Y_COORDS) {
        const TAs = await findTAs(
            migratedLocation.coordinates.longitude,
            migratedLocation.coordinates.latitude
        )
        TAs.forEach((area) => {
            targetAreas.push({
            TA_CODE: area.properties?.TA_CODE,
            TA_Name: area.properties?.TA_Name,
            category: area.properties?.category
          })
        })
        riverSeaRisk =
          await getRiversAndSeaFloodRiskRatingOfLocation(
            migratedLocation.coordinates.latitude,
            migratedLocation.coordinates.longitude
          )
        groundWaterRisk =
          await getGroundwaterFloodRiskRatingOfLocation(
            migratedLocation.coordinates.latitude,
            migratedLocation.coordinates.longitude
          )
    } else if (dataType === LocationDataType.SHAPE_POLYGON) {
        const TAs = await getFloodAreasFromShape(
          JSON.parse(migratedLocation?.geometry?.geoJson)
        )
        TAs.forEach((area) => {
          targetAreas.push({
            TA_CODE: area.properties?.TA_CODE,
            TA_Name: area.properties?.TA_Name,
            category: area.properties?.category
          })
        })
        riverSeaRisk = 'unavailable'
        groundWaterRisk = 'unavailable'
    } else {
        riverSeaRisk = 'unavailable'
        groundWaterRisk = 'unavailable'
    }

    return {targetAreas, riverSeaRisk, groundWaterRisk}

}

function getAlertTypes (targetAreas) {
    const alertTypes = []
    const categoryToType = (type) => {
      const typeMap = {
        'Flood Warning': 'warning',
        'Flood Warning Groundwater': 'warning',
        'Flood Warning Rapid Response': 'warning',
        'Flood Alert': 'alert',
        'Flood Alert Groundwater': 'alert'
      }
      return typeMap[type] || []
    }
    targetAreas?.some(
      (area) => categoryToType(area.category) === 'warning'
    ) && alertTypes.push('ALERT_LVL_1', 'ALERT_LVL_2', 'MONTHLY', 'RESERVED')

    targetAreas?.some(
      (area) => categoryToType(area.category) === 'alert'
    ) && alertTypes.push('ALERT_LVL_3')

    return alertTypes
}

async function migrateLocation (migratedLocation) {
    const location_data_type = calculateLocationDataType(migratedLocation)
    if (!location_data_type) return null
    //if there is a modified date, the location has already been migrated, so return
    if (getLocationOtherAdditional(migratedLocation.additionals, 'lastModified')) return migratedLocation
    const {northing, easting} = location_data_type === LocationDataType.X_AND_Y_COORDS ? convertCoordinatesToEspg27700(migratedLocation.coordinates.longitude, migratedLocation.coordinates.latitude) : {northing: '', easting: ''}
    const {targetAreas, riverSeaRisk, groundWaterRisk} = await getTAAndNaFra(migratedLocation, location_data_type)
    const alertTypes = getAlertTypes(targetAreas)
    const location = {
        id: migratedLocation.id,
        enabled: true,
        name: migratedLocation.name,
        address: migratedLocation.address || null,
        coordinates: migratedLocation.coordinates || null,
        geometry: migratedLocation.geometry || null,
        geocode: migratedLocation.geocode || null,
        additionals: [
          { id: 'locationName', value: { s: getAdditional(migratedLocation.additionals, 'locationName') || migratedLocation.name } },
          { id: 'parentID', value: { s: getAdditional(migratedLocation.additionals, 'parentID') || '' } },
          { id: 'targetAreas', value: { s: getAdditional(migratedLocation.additionals, 'targetAreas') || '' } },
          { id: 'keywords', value: { s: getAdditional(migratedLocation.additionals, 'keywords') || '[]' } },
          {
            id: 'other',
            value: {
              s: JSON.stringify({
                full_address: getLocationOtherAdditional(migratedLocation.additionals, 'full_address') || '',
                postcode: getLocationOtherAdditional(migratedLocation.additionals, 'postcode') ||'',
                x_coordinate: easting,
                y_coordinate: northing,
                internal_reference: getLocationOtherAdditional(migratedLocation.additionals, 'internal_reference') || '',
                business_criticality: getLocationOtherAdditional(migratedLocation.additionals, 'business_criticality') || '',
                location_type: getLocationOtherAdditional(migratedLocation.additionals, 'location_type') || '',
                action_plan: getLocationOtherAdditional(migratedLocation.additionals, 'action_plan') || '',
                notes: getLocationOtherAdditional(migratedLocation.additionals, 'notes') || '',
                location_data_type: location_data_type,
                alertTypes: alertTypes,
                targetAreas: targetAreas,
                riverSeaRisk: riverSeaRisk,
                groundWaterRisk: groundWaterRisk,
                lastModified: getLocationOtherAdditional(migratedLocation.additionals, 'lastModified') || Date.now(),
              })
            }
          }
        ]
      }

    return location

}

module.exports = {migrateLocation}