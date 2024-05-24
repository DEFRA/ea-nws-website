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

    if (response.status === 200) {
      console.log('response data', response.data)
      return response.data
    }
  } catch (error) {
    // Handle specific HTTP errors
    if (error.response) {
      const { status, data } = error.response
      if (status === 400) {
        console.log('Bad Request:', data)
        return data
      } else if (status === 404) {
        console.log('Not Found:', data)
      } else if (status === 500) {
        console.log('Internal Server Error:', data)
      }
    } else if (error.request) {
      //no response was received
      console.log('No response received:', error.request)
    }
  }

  //request failed
  return null
}

module.exports = { apiCall }
