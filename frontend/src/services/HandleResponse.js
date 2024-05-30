const handleResponse = (response, navigate) => {
  console.log('status', response.status)
  switch (response.status) {
    case 200:
      return { responseData: response.data, errorMessage: null }
    case 400:
      return {
        responseData: null,
        errorMessage: 'Bad request, please try again'
      }
    case 404:
      return navigate('/not-found')
    case 500:
      return { responseData: null, errorMessage: response.errorMessage }
  }
}

module.exports = { handleResponse }
