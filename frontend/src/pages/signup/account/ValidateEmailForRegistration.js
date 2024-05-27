import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import InsetText from '../../../gov-uk-components/InsetText'
import TextInput from '../../../gov-uk-components/TextInput'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import {
  setAuthToken,
} from '../../../redux/userSlice'
import backendCall from '../../../services/BackendService'
import codeValidation from '../../../services/Validations/CodeValidation'

export default function ValidateEmailForRegistration() {

  const location = useLocation()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const registerToken = location.state.registerToken

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (code === '') {
      setError('Enter code')
      return
    } else if (!codeValidation(code, 6)) {
      setError('Code must be 6 numbers')
      return
    }

    const backendResponse = await validateCode(code)
    if (!backendResponse) {
      setError('Invalid code')
      return
    }
    navigate('/')
  }

  const validateCode = async (code) => {
    const raw = JSON.stringify({
      registerToken,
      code
    })
    const responseData = await backendCall(raw, 'registerValidate')

    if (
      responseData === undefined ||
      Object.prototype.hasOwnProperty.call(responseData, 'code')
    ) {
      return false
    }
    dispatch(setAuthToken(responseData.authToken))

    return true
  }

  return (
    <>
      <Header />
      <div className="govuk-width-container">
      <Link to="/register" className="govuk-back-link">
          Back
        </Link>
        <ErrorSummary errorList={error === '' ? [] : [error]} />
        <h2 className="govuk-heading-l">Check your email</h2>
        <div className="govuk-body">
          You need to confirm your email address.
        <br></br>
        <br></br>
          We've sent an email with a code to:
          <InsetText text={location.state.email} />
          Enter the code within 4 hours or it will expire.
          <br></br>
          <br></br>
          <TextInput name="Enter code" error={error} onChange={setCode} />
          <Button
            className="govuk-button"
            text="Confirm email address"
            onClick={handleSubmit}
          />
          &nbsp;
          &nbsp;
          <Link to="/register" className="govuk-link">
          Use a different email
          </Link>
          <br></br>
          <Link to="/register" className="govuk-link">
          Get a new code
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}
