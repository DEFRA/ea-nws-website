const axios = require('axios')

const apiCall = async (data, path) => {
  const url = 'http://localhost:9000/' + path

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    return { status: response.status, data: response.data }
  } catch (error) {
    console.log('Error')

    if (error.response) {
      const { status } = error.response
      if (status === 400) {
        return { status }
      } else if (status === 404) {
        return { status }
      } else if (status === 500) {
        console.log('Internal Server Error:', error.response.data)
        return { status: status, errorMessage: error.response.data }
      }
    } else if (error.request) {
      // no response was received
      console.log('No response received:', error.request)
    }
  }
  return null
}

module.exports = { apiCall }
