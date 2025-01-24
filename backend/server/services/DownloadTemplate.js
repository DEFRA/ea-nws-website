const { logger } = require('../plugins/logging')
const getSecretKeyValue = require('./SecretsManager')
const getDownloadTemplateUrl = async () => {
  try {
    const response = await getSecretKeyValue(
      'nws/website/organisation',
      'addressTemplateUrl'
    )
    return {
      status: 200,
      data: response
    }
  } catch (error) {
    logger.error(error)
    return {
      status: 500,
      errorMessage: 'Oops, something happened!'
    }
  }
}

module.exports = {
  getDownloadTemplateUrl
}
