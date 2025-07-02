const { logger } = require('../plugins/logging')
const getSecretKeyValue = require('./SecretsManager')

const getDownloadUrl = async (secretKey) => {
  try {
    const response = await getSecretKeyValue(
      'nws/website/organisation',
      secretKey
    )
    return {
      status: 200,
      data: response
    }
  } catch (error) {
    logger.error(`Error fetching ${secretKey}: ${error}`)
    return {
      status: 500,
      errorMessage: 'Oops, something happened!'
    }
  }
}

const getDownloadTemplateUrl = async () => {
  return await getDownloadUrl('addressTemplateUrl')
}

const getDownloadQuickStartUrl = async () => {
  return await getDownloadUrl('quickStartGuideUrl')
}

module.exports = {
  getDownloadTemplateUrl,
  getDownloadQuickStartUrl
}
