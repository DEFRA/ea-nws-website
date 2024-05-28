import { handleResponse } from './HandleResponse'

export const backendCall = async (data, path, navigate) => {
  let responseData
  console.log("let response data", responseData)
  const url = 'http://localhost:5000/' + path
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
    console.log("not undefined",responseData)
  } catch (error) {
    console.log('ERROR: ', error)
  }
  
  return handleResponse(responseData, navigate)
}

