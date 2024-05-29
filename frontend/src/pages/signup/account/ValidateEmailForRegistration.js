import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import TextInput from '../../../gov-uk-components/Input'
import InsetText from '../../../gov-uk-components/InsetText'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import { backendCall } from '../../../services/BackendService'
import codeValidation from '../../../services/Validations/CodeValidation'

export default function SignUpValidationPage() {
  const location = useLocation()

  const navigate = useNavigate()
  const registerToken = location.state.registerToken

  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    const validationError = codeValidation(code, 6)
    setError(validationError)
    if (validationError === '') {
      const data = {
        registerToken: registerToken,
        code: code
      }

      const { errorMessage } = await backendCall(
        data,
        'signupValidate',
        navigate
      )

      if (errorMessage !== null) {
        setError(errorMessage.desc)
      } else {
        navigate('/signup/contactpreferences')
      }
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
          <InsetText text={location.state.email} />
          Enter the code within 4 hours or it will expire.
          <br />
          <br />
          <TextInput
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
          <Link to="/signup" className="govuk-link">
            Use a different email
          </Link>
          <br />
          <Link to="/signup" className="govuk-link">
            Get a new code
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}
