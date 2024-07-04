import { addressFormatter } from './formatters/AddressFormatter'

export const osPostCodeApiCall = async (postCode) => {
  let responseData
  let errorMessage
  const url = `https://api.os.uk/search/places/v1/postcode?postcode=${postCode}&key=tjk8EgPGUk5tD2sYxAbW3yudGJOhOr8a&output_srs=WGS84`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      errorMessage = 'Enter a real postcode'
    }
    const data = await response.json()
    //Check that postcode is in England
    if (data.results?.[0].DPA.COUNTRY_CODE === 'E') {
      responseData = data.results.map((result) => {
        //remove postcode from result
        //let lastIndex = result.DPA.ADDRESS.lastIndexOf(',')
        //let strippedAddress = result.DPA.ADDRESS.substring(0, lastIndex)
        let formattedAddress = addressFormatter(result.DPA.ADDRESS)
        return {
          address: formattedAddress,
          postcode: result.DPA.POSTCODE,
          latitude: result.DPA.LAT,
          longitude: result.DPA.LNG
        }
      })
    } else {
      errorMessage = 'Enter a full postcode in England'
    }
  } catch (error) {
    errorMessage = 'Enter a real postcode'
  }

  return { responseData, errorMessage }
}
