const axios = require('axios')
const apiToFrontendError = require('./ApiToFrontendError')

const apiCall = async (data, path, origin) => {
  const apiUrl = process.env.API_URL || 'http://localhost:9000'
  const url = apiUrl + '/' + path

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    return { status: response.status, data: response.data }
  } catch (error) {
    if (error.response) {
      const { status } = error.response
      if (status === 400) {
        return {
          status: status,
          errorMessage: 'Oops something broke, try again'
        }
      } else if (status === 404) {
        return { status }
      } else if (status === 500) {
        const errorMessage = error.response.data
        if (errorMessage && origin) {
          if (errorMessage.code) {
            errorMessage.desc =
              apiToFrontendError[errorMessage.code][origin] || errorMessage.desc
          }
        }
        return { status: status, errorMessage: errorMessage }
      }
    } else if (error.request) {
      // no response was received - probably need to return
      console.log('No response received')
      // returning an error so frontend can handle
      return {
        status: 400,
        errorMessage: 'Oops something broke, try again'
      }
    }
  }
  return null
}

module.exports = { apiCall }
