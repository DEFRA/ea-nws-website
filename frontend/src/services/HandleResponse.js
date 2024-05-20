const handleResponse = (response, navigate) => {
  switch (response.statusCode) {
    case 200:
      return response
    case 400:
      navigate('/')
      return
    case 404:
      navigate('/notfound')
      return
    case 500:
      navigate('/error')
      return
  }
}

export { handleResponse }
