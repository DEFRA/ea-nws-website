const getSecretKeyValue = require('./SecretsManager')
const getDownloadOrgFloodHistoryUrl = async () => {
  try {
    const response = await getSecretKeyValue(
      'nws/website',
      'organisationFloodHistoryUrl'
    )
    if (response !== null && response.length >= 0) {
      return {
        status: 200,
        data: response
      }
    } else {
      return {
        status: 500,
        errorMessage: 'organisationFloodHistoryUrl has no value!'
      }
    }
  } catch (error){
    logger.error(error)
    return {
      status: 500,
      errorMessage: 'Oops, something happened!'
    }
  }
}

module.exports = {
  getDownloadOrgFloodHistoryUrl
}
