const getSecretKeyValue = require('./SecretsManager')
const getWfsData = async (WFSParams) => {
  const baseWFSURL = await getSecretKeyValue('nws/website/qgis', 'qgisUrl')
  let wfsURL = `${baseWFSURL}?${new URLSearchParams(WFSParams).toString()}`
  const wfsData = await fetch(wfsURL).then((response) => response.json())

  return {status: 200, data: wfsData}
}

module.exports = {
  getWfsData
}
