import * as React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import Input from '../../../../gov-uk-components/Input'
import InsetText from '../../../../gov-uk-components/InsetText'
import { setProfile } from '../../../../redux/userSlice'
import { backendCall } from '../../../../services/BackendService'
import { authCodeValidation } from '../../../../services/validations/AuthCodeValidation'
export default function ValidateLandlinePhonePage() {
  const location = useLocation()
  const dispatch = useDispatch()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const authToken = 'MockGUIDAuthToken' //useSelector((state) => state.session.authToken)

  const handleSubmit = async () => {
    const validationError = authCodeValidation(code)
    setError(validationError)

    if (validationError === '') {
      const dataToSend = {
        authToken,
        msisdn: location.state.msisdn,
        code
      }

      const { errorMessage, data } = await backendCall(
        dataToSend,
        'signup/contactpreferences/landline/validate'
      )
      if (errorMessage !== null) {
        setError(errorMessage.desc)
      } else {
        dispatch(setProfile(data.profile))
        navigate('/signup/contactpreferences')
      }
    }
  }

  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <Link
          to="/signup/contactpreferences/landline"
          className="govuk-back-link"
        >
          Back
        </Link>
        <ErrorSummary errorList={error === '' ? [] : [error]} />
        <h2 class="govuk-heading-l">Check your email</h2>
        <div class="govuk-body">
          We're calling this number to read out a code:
          <InsetText text={location.state.msisdn} />
          <Input
            name="Enter code"
            inputType="text"
            error={error}
            onChange={(val) => setCode(val)}
          />
          <Button
            className="govuk-button"
            text="Continue"
            onClick={handleSubmit}
          />
          &nbsp; &nbsp;
          <Link
            className="govuk-link"
            to="/signup/contactpreferences/landline/skipconfirm"
            state={{ phoneNumber: location.state.phoneNumber }}
          >
            Skip and confirm later
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
