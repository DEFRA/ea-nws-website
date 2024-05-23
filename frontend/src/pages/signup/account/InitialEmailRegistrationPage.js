import { useState } from 'react'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import TextInput from '../../../gov-uk-components/TextInput'
const backendCall = require('../../../services/BackendService')

const EmailForm = (props) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (event) => {
    if (email === '') {
      setErrorMessage('Enter your email address')
      return
    }
    if (!validateEmail(email)) {
      setErrorMessage(
        'Enter an email address in the correct format, like name@example.com'
      )
      return
    }
    const emailExists = await checkEmail(email)
    if (emailExists === false) {
      setErrorMessage('Email address is already in use')
      return
    }

    window.sessionStorage.setItem('userEmail', email)
    window.location.replace('ValidateEmailForRegistration')
  }

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const checkEmail = async (email) => {
    let registerToken = ''
    var raw = JSON.stringify({ email: email })
    const responseData = await backendCall(raw, 'registerStart')

    const code = responseData['code']
    registerToken = responseData['registerToken']
    // Assign the status code to isValid
    if (code === 101) {
      return false
    }

    window.sessionStorage.setItem('registerToken', registerToken)

    return true
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput name="Email address" onChange={(val) => setEmail(val)} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit" className="govuk-button" data-module="govuk-button">
        Continue
      </button>
    </form>
  )
}

export default function InitialEmailRegistrationPage() {
  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <a href="Start" className="govuk-back-link">
          Back
        </a>
        <h2 className="govuk-heading-l">
          Register for your flood warning account
        </h2>
        <div className="govuk-body">
          <p>Enter a valid email address for registration</p>
          <EmailForm />
          <a href="SignInPage" className="govuk-link">
            Sign in if you already have an account
          </a>
        </div>
      </div>
      <Footer />
    </>
  )
}
