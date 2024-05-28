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
import {backendCall} from '../../../services/BackendService'
import codeValidation from '../../../services/Validations/CodeValidation'
import { useSelector } from 'react-redux'

export default function SignUpValidationPage() {

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const registerToken = location.state.registerToken
 
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const session = useSelector((state) => state.session)

  const handleSubmit = async (event) => {
    console.log("here")
    
    const validationError = codeValidation(code, 6)
    setError(validationError)
    if (validationError === '') {
      const data = {
        registerToken: registerToken,
        code: code
      }

    const {responseData, errorMessage }= await backendCall(data, 'signupValidate', navigate)

    console.log('responseData', responseData)
    console.log('errorMessage', errorMessage)

    if (errorMessage !== null) {
      setError(errorMessage.desc)
    }else {
      navigate('/')
    }
  }
}

  return (
    <>
      <Header />
      <div className="govuk-width-container">
      <Link to="/signup" className="govuk-back-link">
          Back
        </Link>
        {error && <ErrorSummary errorList={[error]} />}
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
          <TextInput inputType="text" value={code} name="Enter code" error={error} onChange={(val) => setCode(val)} />
          <Button
            className="govuk-button"
            text="Confirm email address"
            onClick={handleSubmit}
          />
          &nbsp;
          &nbsp;
          <Link to="/signup" className="govuk-link">
          Use a different email
          </Link>
          <br></br>
          <Link to="/signup" className="govuk-link">
          Get a new code
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}

