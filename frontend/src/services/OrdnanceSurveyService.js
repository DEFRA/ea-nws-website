export const osApiCall = async (postCode) => {
  let responseData
  let errorMessage
  const url = `https://api.os.uk/search/places/v1/postcode?postcode=${postCode}&key=tjk8EgPGUk5tD2sYxAbW3yudGJOhOr8a`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      errorMessage = 'There was a problem, please try again'
    }
    const data = await response.json()
    responseData = data.results.map((result) => {
      //remove postcode from result
      let lastIndex = result.DPA.ADDRESS.lastIndexOf(',')
      let strippedAddress = result.DPA.ADDRESS.substring(0, lastIndex)
      return strippedAddress
    })
  } catch (error) {
    errorMessage = 'There was a problem, please try again'
  }

  return { responseData, errorMessage }
}
