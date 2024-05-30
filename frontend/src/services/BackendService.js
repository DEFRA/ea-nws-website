import axios from 'axios'
import { handleResponse } from './HandleResponse'

export const backendCall = async (data, path, navigate) => {
  const url = 'http://localhost:5000/' + path
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: false
    })
    return handleResponse(
      { data: response.data, status: response.status },
      navigate
    )
  } catch (error) {
    return handleResponse(
      {
        responseData: null,
        status: error.response ? error.response.status : 500
      },
      navigate
    )
  }
}
