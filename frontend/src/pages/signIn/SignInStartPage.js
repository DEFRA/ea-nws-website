import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import TextInput from '../../gov-uk-components/TextInput'
import { backendCall } from '../../services/BackendService'

const EmailForm = (props) => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
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
    if (!emailExists) {
      setErrorMessage('Email address is not recognised - check and try again')
      return
    }

    window.sessionStorage.setItem('userEmail', email)
    navigate('/signin/validate')
  }

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const checkEmail = async (email) => {
    let signInToken = ''
    const raw = JSON.stringify({ email })
    const responseData = await backendCall(raw, 'signInStart')

    const code = responseData.code
    signInToken = responseData.signInToken
    // Assign the status code to isValid
    if (code === 101) {
      return false
    }
    window.sessionStorage.setItem('signInToken', signInToken)
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

export default function SignInPage() {
  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <a href="Start" className="govuk-back-link">
          Back
        </a>
        <h2 className="govuk-heading-l">
          Sign in to your flood warnings account
        </h2>
        <div className="govuk-body">
          You can:
          <ul className="govuk-list govuk-list--bullet">
            <li>update or remove your locations</li>
            <li>change how you get flood messages</li>
            <li>delete your account</li>
          </ul>
          <EmailForm />
          <a href="register" className="govuk-link">
            Sign up if you do not have an account
          </a>
        </div>
      </div>
      <Footer />
    </>
  )
}
