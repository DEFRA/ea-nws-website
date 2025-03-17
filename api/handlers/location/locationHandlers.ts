const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'
import uuidv4 from '../generateAuthToken'
const mockLocations = require('../mockLocations')

async function getLocationCreate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, location } = req.payload as {
    authToken: string
    location: any
  }

  if (authToken !== 'WrongAuthToken' && location) {
    let updatedLocation = location
    // act like geosafe and strip out the geoJson
    if (updatedLocation?.geometry?.geoJson) {
      let oldGeoJson = JSON.parse(updatedLocation.geometry.geoJson)
      updatedLocation.geometry.geoJson = JSON.stringify(oldGeoJson.geometry)
    }
    updatedLocation.id = uuidv4()

    return {
      location: updatedLocation
    }
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getLocationList(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, options } = req.payload as {
    authToken: string
    options: { contactId: string }
  }

  if (authToken !== 'WrongAuthToken') {
    if (options?.contactId) {
      // Geosafe returns all locations linked to contactId#
      console.log('there is a contact ID')
      return {
        locations: mockLocations.allLocations,
        total: mockLocations.allLocations.length
      }
    } else {
      console.log('no contact ID returning all locations')
      return {
        locations: mockLocations.allLocations,
        total: mockLocations.allLocations.length
      }
    }
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getLocationRemove(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, locationIds } = req.payload as {
    authToken: string
    locationIds: Array<string>
  }

  if (authToken !== 'WrongAuthToken' && locationIds) {
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getLocationUpdate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken, location } = req.payload as {
    authToken: string
    location: any
  }
  //location object must already contain location.id
  if (authToken !== 'WrongAuthToken' && location) {
    let updatedLocation = location
    // act like geosafe and strip out the geoJson
    if (updatedLocation?.geometry?.geoJson) {
      let oldGeoJson = JSON.parse(updatedLocation.geometry.geoJson)
      updatedLocation.geometry.geoJson = JSON.stringify(oldGeoJson.geometry)
    }
    return {
      location: updatedLocation
    }
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = {
  getLocationCreate,
  getLocationList,
  getLocationRemove,
  getLocationUpdate
}
