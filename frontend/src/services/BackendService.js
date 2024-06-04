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
    // we need to navigate the user to an error page if we
    // get an error response from requesting to our backend
    // navigate(/error-page)
  }
  return handleResponse(responseData, navigate)
}
