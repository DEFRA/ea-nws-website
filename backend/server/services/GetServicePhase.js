const getSecretKeyValue = require('./SecretsManager')
const getServicePhase = async () => {
  try {
    const response = await getSecretKeyValue(
      'nws/website',
      'servicePhase'
    )
    if (response !== null && response.length > 0) {
      return {
        status: 200,
        data: response
      }
    } else {
      return {
        status: 500,
        errorMessage: 'servicePhase has no value!'
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
  getServicePhase
}
