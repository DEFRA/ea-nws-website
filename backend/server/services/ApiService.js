const axios = require('axios')

const apiCall = async (data, path) => {
  let responseData
  const url = 'http://localhost:9000/' + path
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    console.log('response data', response.data)
    if (response.status === 200) {
      return { status: response.status, data: response.data }
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response
      if (status === 400) {
        console.log('Bad Request:', 400)
        return { status: status }
      } else if (status === 404) {
        console.log('Not Found:', 404)
        return { status: status }
      } else if (status === 500) {
        console.log('Internal Server Error:', error.response.data)
        return { status: status, data: error.response.data }
      }
    } else if (error.request) {
      // no response was received
      console.log('No response received:', error.request)
    }
  }
  return null
}

module.exports = { apiCall }
