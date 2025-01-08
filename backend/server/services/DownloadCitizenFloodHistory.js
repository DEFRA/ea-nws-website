const getSecretKeyValue = require('./SecretsManager')
const getDownloadCitizenFloodHistoryUrl = async () => {
  try {
    const response = await getSecretKeyValue(
      'nws/website',
      'citizenFloodHistoryUrl'
    )
    if (response !== null && response.length >= 0) {
      return {
        status: 200,
        data: response
      }
    } else {
      return {
        status: 500,
        errorMessage: 'citizenFloodHistoryUrl has no value!'
      }
    }
  } catch {
    return {
      status: 500,
      errorMessage: 'Oops, something happened!'
    }
  }
}

module.exports = {
  getDownloadCitizenFloodHistoryUrl
}