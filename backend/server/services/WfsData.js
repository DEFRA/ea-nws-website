const getWfsData = async (WFSParams) => {
  const baseWFSURL = 'http://localhost:8080/ows'
  console.log(WFSParams)
  let wfsURL = `${baseWFSURL}?${new URLSearchParams(WFSParams).toString()}`
  const wfsData = await fetch(wfsURL).then((response) => response.json())

  return {status: 200, data: wfsData}
}

module.exports = {
  getWfsData
}
