import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import InsetText from '../../gov-uk-components/InsetText'
import {
  setAuthToken,
  setProfile,
  setRegistration
} from '../../redux/userSlice'
import backendCall from '../../services/BackendService'
import codeValidation from '../../services/Validations/CodeValidation'

export default function SignInValidatePage() {
  const location = useLocation()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const signinToken = location.state.signinToken

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
      signinToken,
      code
    })
    const responseData = await backendCall(raw, 'signInValidate')

    if (
      responseData === undefined ||
      Object.prototype.hasOwnProperty.call(responseData, 'code')
    ) {
      return false
    }
    dispatch(setAuthToken(responseData.authToken))
    dispatch(setProfile(responseData.profile))
    dispatch(setRegistration(responseData.registration))

    return true
  }

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <Link to="/signin" className="govuk-back-link">
          Back
        </Link>
        <ErrorSummary errorList={error === '' ? [] : [error]} />
        <h2 className="govuk-heading-l">Check your email</h2>
        <div className="govuk-body">
          We've sent a code to:
          <InsetText text={location.state.email} />
          <Input name="Enter code" error={error} onChange={setCode} />
          <Button
            className="govuk-button"
            text="Continue"
            onClick={handleSubmit}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
