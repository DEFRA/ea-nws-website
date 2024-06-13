import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import Input from '../../../../gov-uk-components/Input'
import InsetText from '../../../../gov-uk-components/InsetText'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../../../redux/userSlice'
import { backendCall } from '../../../../services/BackendService'
import {
  addUnverifiedContact,
  addVerifiedContact,
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../../../services/ProfileServices'
import { authCodeValidation } from '../../../../services/validations/AuthCodeValidation'

export default function ValidateLandlinePhonePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  // user has verified mobile but is now going back through sign up flow
  const homePhone = useSelector((state) =>
    state.session.profile.unverified.homePhones[0]
      ? state.session.profile.unverified.homePhones[0]
      : state.session.profile.homePhones[0]
  )
  const session = useSelector((state) => state.session)
  const authToken = session.authToken
  const handleSubmit = async () => {
    const validationError = authCodeValidation(code)
    setError(validationError)

    if (validationError === '') {
      const dataToSend = {
        authToken: authToken,
        msisdn: homePhone,
        code
      }

      const { errorMessage } = await backendCall(
        dataToSend,
        'api/add_contact/landline/validate',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage.desc)
      } else {
        // remove landline from unverified list and add to verified list
        const updatedProfile = removeUnverifiedContact(
          session.profile,
          homePhone
        )
        dispatch(
          setProfile(
            addVerifiedContact(updatedProfile, 'homePhones', homePhone)
          )
        )
        // navigate through sign up flow
        if (session.contactPreferences.includes('Email')) {
          // navigate to email TODO - cameron add this once merged
        } else if (session.contactPreferences.includes('Mobile')) {
          navigate('/signup/contactpreferences/mobile/add')
        } else {
          navigate('/managecontacts')
        }
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const data = { authToken: session.authToken, msisdn: homePhone }
    const { errorMessage } = await backendCall(
      data,
      'api/add_contact/landline/add',
      navigate
    )
    if (errorMessage !== null) {
      setError(errorMessage.desc)
    }
  }

  const differentLandline = (event) => {
    event.preventDefault()
    // remove landline from users profile
    const updatedProfile = removeUnverifiedContact(session.profile, homePhone)
    // perform a remove on verified if user has chosen to go back
    dispatch(setProfile(removeVerifiedContact(updatedProfile, homePhone)))
    // user is going back - pass the mobile given back
    // we need this incase they go back again so we can
    // remove it from the profile
    navigate('/signup/contactpreferences/landline/add', {
      state: {
        mobile: homePhone
      }
    })
  }

  const skipValidation = (event) => {
    event.preventDefault()
    // remove home Phone from verified list if user is going back after validating
    const updatedProfile = removeVerifiedContact(session.profile, homePhone)
    // we will need to add the home Phone back to the unverified list - if it already exists
    // nothing will happen and it will remain
    dispatch(
      setProfile(addUnverifiedContact(updatedProfile, 'homePhones', homePhone))
    )
    navigate('/signup/contactpreferences/landline/skipconfirmation')
  }

  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <PhaseBanner />
        <Link onClick={differentLandline} className="govuk-back-link">
          Back
        </Link>
        {error && <ErrorSummary errorList={[error]} />}
        <h2 class="govuk-heading-l">Check your email</h2>
        <div class="govuk-body">
          We're calling this number to read out a code:
          <InsetText text={homePhone} />
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
            onClick={skipValidation}
            style={{
              display: 'inline-block',
              padding: '8px 10px 7px'
            }}
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
