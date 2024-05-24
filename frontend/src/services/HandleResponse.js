const handleResponse = (response, navigate) => {
  switch (response.statusCode) {
    case 200:
      return response
    case 400:
      return response
    case 404:
      return response
    case 500:
      return response
  }
}

export { handleResponse }
