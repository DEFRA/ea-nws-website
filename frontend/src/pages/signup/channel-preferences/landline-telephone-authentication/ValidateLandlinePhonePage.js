import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import Input from '../../../../gov-uk-components/Input'
import InsetText from '../../../../gov-uk-components/InsetText'
import { setProfile } from '../../../../redux/userSlice'
import { backendCall } from '../../../../services/BackendService'
import {
  addVerifiedContact,
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../../../services/ProfileServices'
import { authCodeValidation } from '../../../../services/validations/AuthCodeValidation'

export default function ValidateLandlinePhonePage() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const msisdn = location.state.msisdn
  const session = useSelector((state) => state.session)

  const handleSubmit = async () => {
    const validationError = authCodeValidation(code)
    setError(validationError)

    if (validationError === '') {
      const dataToSend = {
        authToken: session.authToken,
        msisdn: msisdn,
        code
      }

      const { errorMessage } = await backendCall(
        dataToSend,
        'signup/contactpreferences/landline/validate'
      )
      if (errorMessage !== null) {
        setError(errorMessage.desc)
      } else {
        // remove landline from unverified list and add to verified list
        const updatedProfile = removeUnverifiedContact(session.profile, msisdn)
        dispatch(
          setProfile(addVerifiedContact(updatedProfile, 'homePhones', msisdn))
        )
        // navigate through sign up flow
        if (session.contactPreferences.includes('Email')) {
          // navigate to email TODO - cameron add this once merged
        } else {
          // navigate to addtional details flow
        }
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const data = { authToken: session.authToken, msisdn: msisdn }
    const { errorMessage } = await backendCall(
      data,
      'signup/contactpreferences/landline/validate',
      navigate
    )
    if (errorMessage !== null) {
      setError(errorMessage.desc)
    }
  }

  const differentLandline = (event) => {
    event.preventDefault()
    // remove landline from users profile
    const updatedProfile = removeUnverifiedContact(session.profile, msisdn)
    //perform a remove on verified if user has chosen to go back
    dispatch(setProfile(removeVerifiedContact(updatedProfile, msisdn)))
    navigate('/signup/contactpreferences/landline/add')
  }

  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <Link onClick={differentLandline} className="govuk-back-link">
          Back
        </Link>
        {error && <ErrorSummary errorList={[error]} />}
        <h2 class="govuk-heading-l">Check your email</h2>
        <div class="govuk-body">
          We're calling this number to read out a code:
          <InsetText text={msisdn} />
          <Input
            name="Enter code"
            inputType="text"
            error={error}
            className="govuk-input govuk-input--width-10"
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
            state={{ phoneNumber: msisdn }}
          >
            Skip and confirm later
          </Link>
          <br />
          <Link onClick={getNewCode} className="govuk-link">
            Get a new code
          </Link>
          <br />
          <br />
          <Link onClick={differentLandline} className="govuk-link">
            Enter a different telephone number
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
