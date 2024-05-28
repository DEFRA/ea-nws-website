
import { useState } from 'react'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import TextInput from '../../../gov-uk-components/TextInput'
import {backendCall} from '../../../services/BackendService'
import emailValidation from '../../../services/Validations/EmailValidation'
import InsetText from '../../../gov-uk-components/InsetText'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function SignUpPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const location = useLocation()
  const [error, setError] = useState('')


  const handleSubmit = async () => {
    const validationError = emailValidation(email)
    setError(validationError)
    if (validationError === '') {
      // replace with session.authtoken once flow is working
      const data = { email: email}
      console.log("data", data)
      const { responseData, errorMessage } = await backendCall(
        data,
        'signupStart',
        navigate
      )
      console.log("RESPOSNE DATAEHRE", responseData)
      console.log("RESPOSNE message", errorMessage)
      if (errorMessage !== null) {
        setError(errorMessage.desc)
      } else {
        navigate('/signup/validate', {
          state: { registerToken: responseData.registerToken, email }
        })
      }
    }
  }

  return (
    <>
      <Header />
      <div className="govuk-width-container">
      <Link to="/" className="govuk-back-link">
          Back
        </Link>
        <ErrorSummary errorList={error === '' ? [] : [error]} />
        <h2 className="govuk-heading-l">
          Enter an email address - you'll use this to sign in to your account
        </h2>
        <div className="govuk-body">
          <p>You'll be able to use your account to update your locations, flood messages or contact details. </p>
          <InsetText text='We recommend using an email address you can access 24 hours a day.' />
          <TextInput name="Email address" error={error} onChange={(val) => setEmail(val)} />
          <Button
            className="govuk-button"
            text="Continue"
            onClick={handleSubmit}
          />
          <br></br>
        </div>
      </div>
      <Footer />
    </>
  )
}
