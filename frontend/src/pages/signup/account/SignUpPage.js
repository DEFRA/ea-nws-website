import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import TextInput from '../../../gov-uk-components/TextInput'
import backendCall from '../../../services/BackendService'
import emailValidation from '../../../services/Validations/EmailValidation'
import InsetText from '../../../gov-uk-components/InsetText'

export default function SignUpPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = emailValidation(email)
    setError(validationError)
    if (validationError !== '') {
      return
    }
    const { emailExists, registerToken: token } = await checkEmail(email)

    if (!emailExists) {
      setError('Email address is already registered - sign in')
      return
    }
    const registerToken = token
     navigate('/signup/validate', {
      state: { registerToken, email }
    })
  }

  const checkEmail = async (email) => {
    const data = { email }
    const responseData = await backendCall(data, 'signupStart')

    if (responseData === undefined) {
      return { emailExists: false, registerToken: null }
    }
    const code = responseData.code
    if (code === 101) {
      return { emailExists: false, registerToken: null }
    }
    if(code===106){
      return { emailExists: false, registerToken: null }
    }
    
    return { emailExists: true, registerToken: responseData.registerToken }
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
