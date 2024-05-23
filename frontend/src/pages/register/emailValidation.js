import { useState } from 'react'
import TextInput from '../../gov-uk-components/TextInput'
const backendCall = require('../../services/BackendService')
const registerToken = window.sessionStorage.getItem('registerToken')

const validateNumber = (input, digits) => {
  const numberPattern = new RegExp(`^[0-9]{${digits}}$`)
  return numberPattern.test(input)
}

const ValidateEmailForRegistrationForm = (props) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [code, setCode] = useState('')

  const handleSubmit = async (event) => {
    if (code === '') {
      setErrorMessage('Enter code')
      return
    }
    if (!validateNumber(code, 6)) {
      setErrorMessage('Code must be 6 numbers')
      return
    }
    const apiReturn = await validateCode(code)
    if (!apiReturn) {
      setErrorMessage('Invalid code')
      return
    }
    window.location.replace('Start')
  }

  const validateCode = async (code) => {
    var raw = JSON.stringify({ registerToken: registerToken, code: code })

    const responseData = await backendCall(raw, 'registerValidate')
    console.log('ResponseData', responseData)
    if (responseData.hasOwnProperty('code')) {
      return false
    }

    window.sessionStorage.setItem('authToken', responseData['authToken'])
    window.sessionStorage.setItem('profile', responseData['profile'])
    window.sessionStorage.setItem('registration', responseData['registration'])
    return true
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput name="Enter code" onChange={(val) => setCode(val)}></TextInput>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit" className="govuk-button" data-module="govuk-button">
        ContinueS
      </button>
    </form>
  )
}

export default ValidateEmailForRegistrationForm
