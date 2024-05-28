import { handleResponse } from './HandleResponse'

export const backendCall = async (data, path, navigate) => {
  let responseData
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
  } catch (error) {
    console.log('ERROR: ', error)
  }
  
  return handleResponse(responseData, navigate)
}

