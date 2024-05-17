import { useState } from 'react'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import TextInput from '../../gov-uk-components/TextInput'

const backendCall = require('../../services/BackendService')
const userEmail = window.sessionStorage.getItem('userEmail')
const registerToken = window.sessionStorage.getItem('registerToken')

const validateNumber = (input, digits) => {
  const numberPattern = new RegExp(`^[0-9]{${digits}}$`)
  return numberPattern.test(input)
}

const ValidateEmailForRegistrationForm = (props) => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const code = event.target.code.value

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
    event.target.reset()
    window.location.replace('Start')
  }

  const validateCode = async (code) => {
    const raw = JSON.stringify({ registerToken, code })

    const responseData = await backendCall(raw, 'registerValidate')
    console.log('ResponseData', responseData)
    if (Object.prototype.hasOwnProperty.call(responseData, 'code')) {
      return false
    }

    window.sessionStorage.setItem('authToken', responseData.authToken)
    window.sessionStorage.setItem('profile', responseData.profile)
    window.sessionStorage.setItem('registration', responseData.registration)
    return true
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput name="Enter code" id="code" />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit" class="govuk-button" data-module="govuk-button">
        Continue
      </button>
    </form>
  )
}

export default function ValidateEmailForRegistration() {
  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <a href="register" class="govuk-back-link">
          Back
        </a>
        <h2 class="govuk-heading-l">Check your email</h2>
        <div class="govuk-body">
          We've sent a code to:
          <InsetText text={userEmail} />
          <ValidateEmailForRegistrationForm />
        </div>
      </div>

      <Footer />
    </>
  )
}
