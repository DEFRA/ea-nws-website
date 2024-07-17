const { addressFormatter } = require('./formatters/AddressFormatter')
const getSecretKeyValue = require('../services/SecretsManager')
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

const osFindNameApiCall = async (keyword) => {
  let responseData
  const osApiKey = await getSecretKeyValue('nws/website/osApiKey', 'osApiKey')
  const url = `https://api.os.uk/search/names/v1/find?query=${keyword}&key=${osApiKey}output_srs=EPSG:4326`

  try {
    const response = await axios.get(url)

    // Check that location is in England
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
        errorMessage: 'Enter a location in England'
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
  const osApiKey = await getSecretKeyValue('nws/geosafe/osApiKey', 'osApiKey')
  const osApiSecret = await getSecretKeyValue(
    'nws/geosafe/osApiSecret',
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
