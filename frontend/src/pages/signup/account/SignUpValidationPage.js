import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import Input from '../../../gov-uk-components/Input'
import InsetText from '../../../gov-uk-components/InsetText'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import { setAuthToken } from '../../../redux/userSlice'
import { backendCall } from '../../../services/BackendService'
import { authCodeValidation } from '../../../services/validations/AuthCodeValidation'

export default function SignUpValidationPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const registerToken = useSelector((state) => state.session.registerToken)
  const loginEmail = useSelector((state) => state.session.profile.emails[0])
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    const validationError = authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const dataToSend = {
        registerToken,
        code
      }

      const { data, errorMessage } = await backendCall(
        dataToSend,
        'api/signupValidate',
        navigate
      )

      if (errorMessage !== null) {
        setError(errorMessage.desc)
      } else {
        dispatch(setAuthToken(data.authToken))
        navigate('/signup/contactpreferences')
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const data = { email: loginEmail }
    const { errorMessage } = await backendCall(
      data,
      'api/signupStart',
      navigate
    )
    if (errorMessage !== null) {
      setError(errorMessage.desc)
    }
  }

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <PhaseBanner />
        <Link to="/signup" className="govuk-back-link">
          Back
        </Link>
        {error && <ErrorSummary errorList={[error]} />}
        <h2 className="govuk-heading-l">Check your email</h2>
        <div className="govuk-body">
          You need to confirm your email address.
          <br />
          <br />
          We've sent an email with a code to:
          <InsetText text={loginEmail} />
          Enter the code within 4 hours or it will expire.
          <br />
          <br />
          <Input
            className="govuk-input govuk-input--width-10"
            inputType="text"
            value={code}
            name="Enter code"
            error={error}
            onChange={(val) => setCode(val)}
          />
          <Button
            className="govuk-button"
            text="Confirm email address"
            onClick={handleSubmit}
          />
          &nbsp; &nbsp;
          <Link
            to="/signup"
            className="govuk-link"
            style={{
              display: 'inline-block',
              padding: '8px 10px 7px'
            }}
          >
            Use a different email
          </Link>
          <br />
          <Link
            onClick={getNewCode}
            className="govuk-link"
            style={{
              display: 'inline-block'
            }}
          >
            Get a new code
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}
