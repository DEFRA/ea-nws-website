export const osPostCodeApiCall = async (postCode) => {
  let responseData
  let errorMessage
  const url = `https://api.os.uk/search/places/v1/postcode?postcode=${postCode}&key=tjk8EgPGUk5tD2sYxAbW3yudGJOhOr8a`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      errorMessage = 'There was a problem, please try again'
    }
    const data = await response.json()
    //Check that postcode is in England
    console.log(data.results[0].DPA)
    if (data.results?.[0].DPA.COUNTRY_CODE === 'E') {
      responseData = data.results.map((result) => {
        //remove postcode from result
        let lastIndex = result.DPA.ADDRESS.lastIndexOf(',')
        let strippedAddress = result.DPA.ADDRESS.substring(0, lastIndex)
        return strippedAddress
      })
    } else {
      errorMessage = 'Enter a full postcode in England'
    }
  } catch (error) {
    errorMessage = 'There was a problem, please try again'
  }

  return { responseData, errorMessage }
}
