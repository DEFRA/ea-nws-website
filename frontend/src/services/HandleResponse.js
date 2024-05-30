const handleResponse = (response, navigate) => {
  switch (response.status) {
    case 200:
      return {
        successful: true,
        responseData: response.data,
        errorMessage: null
      }
    case 400:
      return {
        successful: false,
        responseData: null,
        errorMessage: 'Oops something happened, please try again'
      }
    case 404:
      return navigate('/not-found')
    case 500:
      return {
        successful: false,
        responseData: null,
        errorMessage: response.errorMessage
      }
  }
}

module.exports = { handleResponse }
