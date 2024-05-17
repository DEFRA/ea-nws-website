import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import TextInput from '../../gov-uk-components/TextInput'
import {
  setAuthToken,
  setProfile,
  setRegistration
} from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'

const userEmail = window.sessionStorage.getItem('userEmail')
const signInToken = window.sessionStorage.getItem('signInToken')

const validateNumber = (input, digits) => {
  const numberPattern = new RegExp(`^[0-9]{${digits}}$`)
  return numberPattern.test(input)
}

const SignInValidateForm = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    navigate('/signin')
  }

  const validateCode = async (code) => {
    const raw = JSON.stringify({ signinToken: signInToken, code })

    const responseData = await backendCall(raw, 'signInValidate')
    console.log('ResponseData', responseData)
    if (responseData.hasOwnProperty('code')) {
      return false
    }

    dispatch(setAuthToken(responseData.authToken))
    dispatch(setProfile(responseData.profile))
    dispatch(setRegistration(responseData.registration))

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

export default function CheckYourEmailPage() {
  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <a href="SignInPage" class="govuk-back-link">
          Back
        </a>
        <h2 class="govuk-heading-l">Check your email</h2>
        <div class="govuk-body">
          We've sent a code to:
          <InsetText text={userEmail} />
          <SignInValidateForm />
        </div>
      </div>

      <Footer />
    </>
  )
}
