const fetch = require('node-fetch')

const apiCall = async (data, path) => {
  let responseData
  const url = 'http://localhost:9000/' + path
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    responseData = await response.json()
  } catch (error) {
    console.log('ERROR: ', error)
  }
  return responseData
}

module.exports = apiCall
