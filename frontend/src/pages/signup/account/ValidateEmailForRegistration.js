import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import Input from '../../../gov-uk-components/Input'
import InsetText from '../../../gov-uk-components/InsetText'

const backendCall = require('../../../services/BackendService')
const userEmail = window.sessionStorage.getItem('userEmail')
const registerToken = window.sessionStorage.getItem('registerToken')

const validateNumber = (input, digits) => {
  const numberPattern = new RegExp(`^[0-9]{${digits}}$`)
  return numberPattern.test(input)
}

const ValidateEmailForRegistrationForm = (props) => {
  const navigate = useNavigate()
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
    navigate('/signup/contactpreferences')
  }

  const validateCode = async (code) => {
    const raw = JSON.stringify({ registerToken, code })

    const responseData = await backendCall(raw, 'registerValidate')
    console.log('ResponseData', responseData)
    if (responseData.hasOwnProperty('code')) {
      return false
    }

    window.sessionStorage.setItem('authToken', responseData.authToken)
    window.sessionStorage.setItem('profile', responseData.profile)
    window.sessionStorage.setItem('registration', responseData.registration)
    return true
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        inputType="text"
        name="Enter code"
        onChange={(val) => setCode(val)}
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit" className="govuk-button" data-module="govuk-button">
        Continue
      </button>
    </form>
  )
}

export default function ValidateEmailForRegistration() {
  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <a href="register" className="govuk-back-link">
          Back
        </a>
        <h2 className="govuk-heading-l">Check your email</h2>
        <div className="govuk-body">
          We've sent a code to:
          <InsetText text={userEmail} />
          <ValidateEmailForRegistrationForm />
        </div>
      </div>

      <Footer />
    </>
  )
}
