const getSecretKeyValue = require('./SecretsManager')
const fetch = require('node-fetch')
const getWfsData = async (WFSParams) => {
  const baseWFSURL = await getSecretKeyValue('nws/qgis', 'qgisUrl')
  const wfsURL = `${baseWFSURL}?${new URLSearchParams(WFSParams).toString()}`

  console.log('wfsURL', wfsURL)

  try {
    const wfsData = await fetch(wfsURL).then((response) => response.json())
    console.log('wfsData', wfsData)
    return { status: 200, data: wfsData }
  } catch (error) {
    console.log('error', error)
    return { status: 500, data: null }
  }
}

module.exports = {
  getWfsData
}
