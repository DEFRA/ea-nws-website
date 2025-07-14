const getSecretKeyValue = require('./SecretsManager')
const getPartnerId = async () => {
  try {
    const response = await getSecretKeyValue(
      'nws/website',
      'partnerId'
    )
    if (response !== null && response.length > 0) {
      return {
        status: 200,
        data: response
      }
    } else {
      return {
        status: 500,
        errorMessage: 'partnerId has no value!'
      }
    }
  } catch {
    return {
      status: 500,
      errorMessage: 'The system encountered an unexpected error'
    }
  }
}

module.exports = {
  getPartnerId
}
