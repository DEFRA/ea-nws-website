const { addressFormatter } = require('./formatters/AddressFormatter')
const getSecretKeyValue = require('../services/SecretsManager')
const axios = require('axios')

//update these calls to use axios

const osPostCodeApiCall = async (postCode) => {
  let responseData
  const osApiKey = await getSecretKeyValue('nws/geosafe/osApiKey', 'osApiKey')
  const url = `https://api.os.uk/search/places/v1/postcode?postcode=${postCode}&key=${osApiKey}&output_srs=EPSG:4326`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      return {
        status: 500,
        errorMessage: 'Enter a real postcode'
      }
    }
    const data = await response.json()
    // Check that postcode is in England
    if (data.results?.[0].DPA.COUNTRY_CODE === 'E') {
      responseData = data.results.map((result) => {
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
      errorMessage: 'Enter a real postcode'
    }
  }
}

//The work below is still a WIP - it can probs be refactored as well to work with the above method
const osFindNameApiCall = async (keyword) => {
  let responseData
  const osApiKey = await getSecretKeyValue('nws/geosafe/osApiKey', 'osApiKey')
  const url = `https://api.os.uk/search/names/v1/find?query=${keyword}&key=${osApiKey}output_srs=EPSG:4326`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      return {
        status: 500,
        errorMessage: 'some error'
      }
    }
    const data = await response.json()
    // Check that postcode is in England
    if (data.results?.[0].DPA.COUNTRY_CODE === 'E') {
      responseData = data.results.map((result) => {
        const formattedAddress = addressFormatter(result.DPA.ADDRESS)
        return {
          address: formattedAddress,
          postcode: result.DPA.POSTCODE,
          latitude: result.DPA.LAT,
          longitude: result.DPA.LNG
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

const oAuth2ApiCall = async () => {
  const osApiKey = await getSecretKeyValue('nws/geosafe/osApiKey', 'osApiKey')
  //update to use aws secrets
  const projectApiSecret = 'TZ0XOWBB4wVaVRYC'
  const url = `https://api.os.uk/oauth2/token/v1`

  const btoa = (str) => Buffer.from(str).toString('base64')
  const encodedCredentials = btoa(`${osApiKey}:${projectApiSecret}`)

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

    return response.data.access_token
  } catch {
    return {
      status: 500,
      errorMessage: 'Oops, something happened!'
    }
  }
}

module.exports = { osPostCodeApiCall, osFindNameApiCall, oAuth2ApiCall }
