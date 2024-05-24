const backendCall = async (data, path) => {
  let responseData
  const url = 'http://localhost:3000/' + path
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    responseData = await response.json()
  } catch (error) {
    console.log('ERROR: ', error)
  }
  return responseData
}

module.exports = { backendCall }
