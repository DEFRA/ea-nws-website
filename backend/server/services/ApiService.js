const axios = require('axios')
const getSecretKeyValue = require('./SecretsManager')
const apiToFrontendError = require('./ApiToFrontendError')

const getErrorMessage = (path, errorMessage) => {
  const apiPath = path.split('/').pop()
  const apiPathCode = apiPath.concat('_', errorMessage.code)
  return apiToFrontendError[apiPathCode] || errorMessage.desc
}

const apiCall = async (data, path) => {
  const apiUrl = await getSecretKeyValue('nws/geosafe', 'apiUrl')
  const url = apiUrl + '/' + path

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    return { data: response.data }
  } catch (error) {
    if (error.response) {
      const { status } = error.response
      if (status === 400) {
        return {
          errorMessage: 'Oops something broke, try again'
        }
      } else if (status === 404) {
        return
      } else if (status === 500) {
        return { errorMessage: getErrorMessage(path, error.response.data) }
      }
    } else if (error.request) {
      // no response was received - probably need to return
      console.log('No response received')
      // returning an error so frontend can handle
      return {
        errorMessage: 'Oops something broke, try again'
      }
    }
  }
  return null
}

module.exports = { apiCall }
