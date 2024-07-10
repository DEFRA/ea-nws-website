const { addressFormatter } = require('./formatters/AddressFormatter')

const osPostCodeApiCall = async (postCode) => {
  let responseData
  const url = `https://api.os.uk/search/places/v1/postcode?postcode=${postCode}&key=tjk8EgPGUk5tD2sYxAbW3yudGJOhOr8a&output_srs=EPSG:4326`

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
        errorMessage: 'Enter a full postcode in England'
      }
    }
  } catch (error) {
    return {
      status: 500,
      errorMessage: 'Enter a real postcode'
    }
  }
}

//The work below is still a WIP - it can probs be refactored as well to work with the above method
const osFindNameApiCall = async (keyword) => {
  let responseData

  const url = `https://api.os.uk/search/places/v1/postcode?postcode=${postCode}&key=tjk8EgPGUk5tD2sYxAbW3yudGJOhOr8a&output_srs=EPSG:4326`

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
        errorMessage: 'Enter a full postcode in England'
      }
    }
  } catch (error) {
    return {
      status: 500,
      errorMessage: 'Enter a real postcode'
    }
  }
}

module.exports = { osPostCodeApiCall }
