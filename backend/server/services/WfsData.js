const { logger } = require('../plugins/logging')
const getSecretKeyValue = require('./SecretsManager')
const fetch = require('node-fetch')

const getWfsData = async (WFSParams) => {
  const baseWFSURL = await getSecretKeyValue('nws/qgis', 'qgisUrl')
  const wfsURL = `${baseWFSURL}?${new URLSearchParams(WFSParams).toString()}`

  try {
    const wfsData = await fetch(wfsURL).then((response) => response.json())
    return { status: 200, data: wfsData }
  } catch (error) {
    logger.error(error)
    return { status: 500, data: null }
  }
}

module.exports = {
  getWfsData
}
