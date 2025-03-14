const axios = require('axios')
const https = require('https')
const getSecretKeyValue = require('./SecretsManager')
const apiToFrontendError = require('./ApiToFrontendError')
const {
  convertGeoSafeProfile,
  convertWebProfile
} = require('./formatters/profileFormatter')
const { logger } = require('../plugins/logging')

const getErrorMessage = (path, errorMessage) => {
  const apiPath = path.split('/').pop()
  const apiPathCode = apiPath.concat('_', errorMessage.code)
  return apiToFrontendError[apiPathCode] || errorMessage.desc
}

const apiCall = async (data, path) => {
  const apiUrl = await getSecretKeyValue('nws/geosafe', 'apiUrl')
  const url = apiUrl + '/' + path
  let webProfile = null

  if (data.profile) {
    webProfile = JSON.parse(JSON.stringify(data.profile))
    data.profile = convertWebProfile(data.profile)
  }

  if (
    data.location?.coordinates?.latitude &&
    data.location?.coordinates?.longitude
  ) {
    data.location.coordinates.latitude = parseInt(
      data.location.coordinates.latitude * 10 ** 6
    )
    data.location.coordinates.longitude = parseInt(
      data.location.coordinates.longitude * 10 ** 6
    )
  }

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      withCredentials: false
    })

    if (response.data.profile) {
      response.data.profile = convertGeoSafeProfile(
        response.data.profile,
        webProfile
      )
    }

    if (
      response.data.location?.coordinates?.latitude &&
      response.data.location?.coordinates?.longitude
    ) {
      response.data.location.coordinates.latitude =
        response.data.location.coordinates.latitude / 10 ** 6
      response.data.location.coordinates.longitude =
        response.data.location.coordinates.longitude / 10 ** 6
    }

    if (response.data.location?.geometry?.geoJson) {
      response.data.location.geometry.geoJson = JSON.stringify(
        {
          type: 'Feature',
          properties: {},
          geometry: JSON.parse(response.data.location.geometry.geoJson),
          bbox: []
        }
      )
    }

    if (response.data.locations) {
      response.data.locations.forEach((location) => {
        if (location.coordinates?.latitude && location.coordinates?.longitude) {
          location.coordinates.latitude =
            location.coordinates.latitude / 10 ** 6
          location.coordinates.longitude =
            location.coordinates.longitude / 10 ** 6
        }
        if (location?.geometry?.geoJson) {
          location.geometry.geoJson = JSON.stringify(
            {
              type: 'Feature',
              properties: {},
              geometry: JSON.parse(location.geometry.geoJson),
              bbox: []
            }
          )
        }
      })
    }

    return { status: response.status, data: response.data }
  } catch (error) {
    if (error.response) {
      logger.error(error.response)
      const { status } = error.response
      if (status === 400) {
        return {
          status: status,
          errorMessage: 'Oops something broke, try again'
        }
      } else if (status === 404) {
        return { status }
      } else if (status === 500) {
        return {
          status: status,
          errorMessage: getErrorMessage(path, error.response.data)
        }
      }
    } else if (error.request) {
      logger.error(error.request)
      // no response was received - probably need to return
      // returning an error so frontend can handle
      return {
        status: 400,
        errorMessage: 'Oops something broke, try again'
      }
    }
    logger.error(error)
  }
  return null
}

module.exports = { apiCall }
