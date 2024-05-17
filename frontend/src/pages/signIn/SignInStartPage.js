import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import TextInput from '../../gov-uk-components/TextInput'
const backendCall = require('../../services/BackendService')

const EmailForm = (props) => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const email = event.target.emailAddress.value

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
    event.target.reset()
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
      <TextInput name='Email address' id='emailAddress' />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type='submit' class='govuk-button' data-module='govuk-button'>
        Continue
      </button>
    </form>
  )
}

export default function SignInPage () {
  return (
    <>
      <Header />
      <div class='govuk-width-container'>
        <a href='Start' class='govuk-back-link'>
          Back
        </a>
        <h2 class='govuk-heading-l'>Sign in to your flood warnings account</h2>
        <div class='govuk-body'>
          You can:
          <ul class='govuk-list govuk-list--bullet'>
            <li>update or remove your locations</li>
            <li>change how you get flood messages</li>
            <li>delete your account</li>
          </ul>
          <EmailForm />
          <a href='Start' class='govuk-link'>
            Sign up if you do not have an account
          </a>
        </div>
      </div>
      <Link to='/managecontacts' className='govuk-link'>
        manage contacts
      </Link>
      <Footer />
    </>
  )
}
