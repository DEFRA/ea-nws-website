const { GENERIC_ERROR_MSG } = require('../constants/errorMessages')
const getSecretKeyValue = require('./SecretsManager')
const getEAEmail = async () => {
  try {
    const response = await getSecretKeyValue(
      'nws/website',
      'eaEmail'
    )
    if (response !== null && response.length > 0) {
      return {
        status: 200,
        data: response
      }
    } else {
      return {
        status: 500,
        errorMessage: 'eaEmail has no value!'
      }
    }
  } catch {
    return {
      status: 500,
      errorMessage: GENERIC_ERROR_MSG
    }
  }
}

module.exports = {
  getEAEmail
}
