const axios = require('axios')
const https = require('https')
const getSecretKeyValue = require('./SecretsManager')
const apiToFrontendError = require('./ApiToFrontendError')
const { convertGeoSafeProfile } = require('./formatters/profileFormatter')

const getErrorMessage = (path, errorMessage) => {
  const apiPath = path.split('/').pop()
  const apiPathCode = apiPath.concat('_', errorMessage.code)
  return apiToFrontendError[apiPathCode] || errorMessage.desc
}

const apiCall = async (data, path) => {
  const apiUrl = await getSecretKeyValue('nws/geosafe', 'apiUrl')
  const url = apiUrl + '/' + path

  try {
    let response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      withCredentials: false
    })

    if (response.data.profile) {
      response.data.profile = convertGeoSafeProfile(response.data.profile)
      console.log(response.data)
    }

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
        return {
          status: status,
          errorMessage: getErrorMessage(path, error.response.data)
        }
      }
    } else if (error.request) {
      // no response was received - probably need to return
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
