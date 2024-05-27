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
    let registerToken = null
    console.log("here to pass to state1", registerToken)
    if (email === '') {
      setError('Enter an email address')
      return
    } else if (!emailValidation(email)) {
      setError(
        'Enter an email address in the correct format, like name@example.com'
      )
      return
    }

    const { emailExists, registerToken: token } = await checkEmail(email)

    console.log("A", registerToken)

    if (!emailExists) {
      console.log("B", registerToken)
      setError('Email address is not recognised - check and try again')
      return
    }

     console.log("c", registerToken)
     navigate('/register/validate', {
     
      state: { registerToken, email }
      
    })
  }

  const checkEmail = async (email) => {
    const raw = JSON.stringify({ email })
    const responseData = await backendCall(raw, 'registerStart')
    console.log("response data", registerToken)
    if (responseData === undefined) {
      return { emailExists: false, registerToken: null }
    }
    const code = responseData.code
    if (code === 101) {
      return { emailExists: false, registerToken: null }
    }
    const registerToken = responseData.registerToken
    console.log("response data", registerToken)
    return { emailExists: true, registerToken: registerToken }
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
