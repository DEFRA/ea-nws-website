const getSecretKeyValue = require('./SecretsManager')
const getDownloadFloodHistoryUrl = async () => {
  try {
    const response = await getSecretKeyValue(
      'nws/website',
      'addressFloodHistoryUrl'
    )
    if (response !== null && response.length >= 0) {
      return {
        status: 200,
        data: response
      }
    } else {
      return {
        status: 500,
        errorMessage: 'addressFloodHistoryUrl has no value!'
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
  getDownloadFloodHistoryUrl
}
