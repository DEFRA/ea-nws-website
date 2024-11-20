const getSecretKeyValue = require('./SecretsManager')
const getDownloadFloodHistoryUrl = async () => {
  try {
    const response = await getSecretKeyValue(
      'nws/website',
      'addressFloodHistoryUrl'
    )
    return {
      status: 200,
      data: response
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
