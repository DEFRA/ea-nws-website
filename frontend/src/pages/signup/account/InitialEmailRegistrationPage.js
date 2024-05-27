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

export default function InitialEmailRegistrationPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

   
    console.log("email token on handle submit", email)

    if (email === '') {
      setError('Enter an email address')
      return
    } else if (!emailValidation(email)) {
      setError(
        'Enter an email address in the correct format, like name@example.com'
      )
      return
    }

    console.log("befor check email", email)
    const { emailExists, registerToken } = await checkEmail(email)

    if (!emailExists) {
      setError('Email address is already registered - sign in')
      return
    }

     navigate('/register/validate', {
      state: { registerToken, email }
    })
  }

  const checkEmail = async (email) => {
    console.log("in check email", email)
    const data = JSON.stringify({ email })
    const responseData = await backendCall(data, 'registerStart')

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
    
    const registerToken = responseData.registerToken
    console.log("response data sign in", registerToken)
    return { emailExists: true, registerToken }
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
          <TextInput name="Email address" error={error} onChange={setEmail} />
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
