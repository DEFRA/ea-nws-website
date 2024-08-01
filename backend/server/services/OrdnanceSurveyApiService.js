const { addressFormatter } = require('./formatters/AddressFormatter')
const { locationNameFormatter } = require('./formatters/LocationNameFormatter')
const getSecretKeyValue = require('../services/SecretsManager')
const proj4 = require('proj4')
const axios = require('axios')

const osPostCodeApiCall = async (postCode) => {
  let responseData
  const osApiKey = await getSecretKeyValue('nws/website/osApiKey', 'osApiKey')
  const url = `https://api.os.uk/search/places/v1/postcode?postcode=${postCode}&key=${osApiKey}&output_srs=EPSG:4326`

  try {
    const response = await axios.get(url)

    // Check that postcode is in England
    if (response.data.results?.[0].DPA.COUNTRY_CODE === 'E') {
      responseData = response.data.results.map((result) => {
        const formattedAddress = addressFormatter(result.DPA.ADDRESS)
        return {
          name: formattedAddress,
          address: result.DPA.UPRN,
          coordinates: { latitude: result.DPA.LAT, longitude: result.DPA.LNG },
          postcode: result.DPA.POSTCODE
        }
      })

      return { status: response.status, data: responseData }
    } else {
      return {
        status: 500,
        errorMessage: 'Enter a full postcode in England'
      }
    }
  } catch {
    return {
      status: 500,
      errorMessage: 'Oops, something happened!'
    }
  }
}

const osFindNameApiCall = async (name) => {
  let responseData
  const osApiKey = await getSecretKeyValue('nws/website/osApiKey', 'osApiKey')
  const url = `https://api.os.uk/search/names/v1/find?query=${name}&key=${osApiKey}`
  proj4.defs(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs'
  )
  proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs')

  const convertCoordinates = (x, y) => {
    const [longitude, latitude] = proj4('EPSG:27700', 'EPSG:4326', [x, y])
    return { latitude, longitude }
  }

  try {
    const response = await axios.get(url)
    // check if there are any results - if none, then return error

    // Check that location is in England
    if (response.data.results?.[0].GAZETTEER_ENTRY.COUNTRY === 'England') {
      responseData = response.data.results.map((result) => {
        const formattedLocationName = locationNameFormatter(
          result.GAZETTEER_ENTRY
        )
        const coordinates = convertCoordinates(
          result.GAZETTEER_ENTRY.GEOMETRY_X,
          result.GAZETTEER_ENTRY.GEOMETRY_Y
        )

        return {
          name: formattedLocationName,
          address: '',
          coordinates: coordinates,
          // maybe we can remove this?
          postcode: ''
        }
      })

      return { status: response.status, data: responseData }
    } else {
      return {
        status: 500,
        errorMessage: 'Enter a place name, town or keyword in England'
      }
    }
  } catch {
    return {
      status: 500,
      errorMessage: 'Oops, something happened!'
    }
  }
}

const osOAuth2ApiCall = async () => {
  const osApiKey = await getSecretKeyValue('nws/website/osApiKey', 'osApiKey')
  const osApiSecret = await getSecretKeyValue(
    'nws/website/osApiSecret',
    'osApiSecret'
  )
  const url = 'https://api.os.uk/oauth2/token/v1'

  const btoa = (str) => Buffer.from(str).toString('base64')
  const encodedCredentials = btoa(`${osApiKey}:${osApiSecret}`)

  try {
    const response = await axios.post(
      url,
      new URLSearchParams({
        grant_type: 'client_credentials'
      }),
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    return { status: 200, data: response.data.access_token }
  } catch {
    return {
      status: 500,
      errorMessage: 'Oops, something happened!'
    }
  }
}

module.exports = {
  osPostCodeApiCall,
  osFindNameApiCall,
  osOAuth2ApiCall
}
