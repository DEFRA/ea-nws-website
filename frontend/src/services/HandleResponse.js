const handleResponse = (response, navigate) => {
  console.log('re', response)
  console.log(response.status)
  switch (response.status) {
    case 200:
      return { data: response.data, errorMessage: null }
    case 400:
      return { data: null, errorMessage: 'Bad request, please try again' }
    case 404:
      // need to add a not found page
      return navigate('/not-found')
    case 500:
      return { data: null, errorMessage: response.errorMessage }
  }
}

module.exports = { handleResponse }
