const axios = require('axios')

const apiCall = async (data, path) => {
  const url = 'http://localhost:9000/' + path
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    if (response.status === 200) {
      return { status: response.status, data: response.data }
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response
      if (status === 400) {
        console.log('Bad Request:', 400)
        return data
      } else if (status === 404) {
        console.log('Not Found:', 404)
      } else if (status === 500) {
        console.log('Internal Server Error:', error.response.data)
        return { status: 500, data: error.response.data }
      }
    } else if (error.request) {
      // no response was received
      console.log('No response received:', error.request)
    }
  }
  return null
}

module.exports = { apiCall }
