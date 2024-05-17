const fetch = require('node-fetch')

const apiCall = async (raw, call) => {
  let responseData
  const url = 'http://localhost:9000/' + call
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: raw
    })
    responseData = await response.json()
  } catch (error) {
    console.log('ERROR: ', error)
  }
  return responseData
}

module.exports = apiCall
