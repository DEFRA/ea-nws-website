const handleResponse = (response, navigate) => {
  console.log("here at handle response code", response.status)
  switch (response.status) {
    case 200:
      console.log("here at handle response 200", )
      return { responseData: response.data, errorMessage: null }
    case 400:
      return { responseData: null, errorMessage: 'Bad request, please try again' }
    case 404:
      return navigate('/not-found')
    case 500:
      console.log("here at handle response code", response.errorMessage)
      return { responseData: null, errorMessage: 'Invalid Code'}
  }
}

module.exports = { handleResponse }
