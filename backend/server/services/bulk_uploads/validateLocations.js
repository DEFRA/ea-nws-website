const proj4 = require('proj4')
const { osFindApiCall } = require('../OrdnanceSurveyApiService')
const { getWfsData } = require('../../services/WfsData')
const turf = require('@turf/turf')

const getCoords = async (location) => {
  const addressWithPostcode = location.Full_address.concat(
    ', ',
    location.Postcode
  )
  const { errorMessage, data } = await osFindApiCall(addressWithPostcode)
  return { errorMessage, data }
}

function validateCoords (X, Y) {
  // Check its a valid number
  if (!/^\d+$/.test(X) || !/^\d+$/.test(Y)) {
    // X or Y given is not a number
    return false
  } else if (
    Number(X) >= 0 &&
    Number(X) <= 700000 &&
    Number(Y) >= 0 &&
    Number(Y) <= 1300000
  ) {
    // Is a number and within the bounds for EPSG: 27700
    return true
  } else {
    // Is a number but not valid for EPSG: 27700
    return false
  }
}

function convertCoords (X, Y) {
  proj4.defs(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs'
  )
  proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs')
  const [longitude, latitude] = proj4('EPSG:27700', 'EPSG:4326', [
    Number(X),
    Number(Y)
  ])
  return { latitude: latitude, longitude: longitude }
}

const isCoordInEngland = async (lat, lng) => {
  const WFSParams = {
    service: 'WFS',
    map: 'uk-ob.qgz',
    version: '1.1.0',
    request: 'GetFeature',
    typename: 'aoi-national-boundary',
    srsname: 'EPSG:4326',
    outputFormat: 'GEOJSON'
  }
  const { data: geojson } = await getWfsData(WFSParams)
  const point = turf.point([lng, lat])
  const poly = turf.multiPolygon(geojson.features[0].geometry.coordinates)
  return turf.booleanPointInPolygon(point, poly)
}

const validateLocations = async (locations) => {
  // used to store valid and invalid locations
  const valid = []
  const invalid = []

  // if there is location data we need to process it
  if (locations) {
    await Promise.all(
      locations.map(async (location) => {
        // Location coords/address is mandatory
        if (location.X_coordinates && location.Y_coordinates) {
          const isValid = validateCoords(
            location.X_coordinates,
            location.Y_coordinates
          )
          if (isValid) {
            // convert coords
            location.coordinates = convertCoords(
              location.X_coordinates,
              location.Y_coordinates
            )

            // Check if coordinate is in England
            const coordInEngland = await isCoordInEngland(
              location.coordinates.latitude,
              location.coordinates.longitude
            )
            if (coordInEngland) {
              valid.push(location)
            } else {
              location.error = ['not in england']
              invalid.push(location)
            }
          } else {
            location.error = ['not found']
            invalid.push(location)
          }
        } else if (location.Full_address && location.Postcode) {
          // calculate X and Y based on address and postcode
          const { errorMessage, data } = await getCoords(location)
          if (errorMessage) {
            errorMessage === 'No matches found' &&
              (location.error = ['not found'])
            errorMessage === 'No match in England' &&
              (location.error = ['not in england'])
            invalid.push(location)
          } else {
            location.coordinates = data[0].coordinates
            location.address = data[0].address
            valid.push(location)
          }
        } else {
          location.error = ['not found']
          invalid.push(location)
        }
      })
    )
  }

  return { valid: valid, invalid: invalid }
}

module.exports = { validateLocations }
