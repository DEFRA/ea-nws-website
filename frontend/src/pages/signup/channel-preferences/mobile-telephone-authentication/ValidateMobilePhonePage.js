import React, { useState } from 'react'
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

export default function ValidateMobilePhone () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  // set the mobile based on what direction of flow user has come from
  // if user is going forward, show them the unverified
  // if user is going back after validating the number, show them the verified
  const mobile = useSelector((state) =>
    state.session.profile.unverified.mobilePhones[0]
      ? state.session.profile.unverified.mobilePhones[0]
      : state.session.profile.mobilePhones[0]
  )
  const session = useSelector((state) => state.session)

  const handleSubmit = async () => {
    const validationError = authCodeValidation(code)
    setError(validationError)

    if (validationError === '') {
      const dataToSend = {
        authToken: session.authToken,
        msisdn: mobile,
        code
      }
      const { errorMessage } = await backendCall(
        dataToSend,
        'signup/contactpreferences/mobile/validate',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage.desc)
      } else {
        // remove mobile from unverified list and add to verified list
        const updatedProfile = removeUnverifiedContact(session.profile, mobile)
        dispatch(
          setProfile(addVerifiedContact(updatedProfile, 'mobile', mobile))
        )
        // navigate through sign up flow
        if (session.contactPreferences.includes('Email')) {
          // navigate to email TODO - cameron add this once merged
        } else if (session.contactPreferences.includes('PhoneCall')) {
          navigate('/signup/contactpreferences/landline/add')
        } else {
          navigate('/')
          // navigate to addtional details flow
        }
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const data = { authToken: session.authToken, msisdn: mobile }
    const { errorMessage } = await backendCall(
      data,
      'signup/contactpreferences/mobile/add',
      navigate
    )
    if (errorMessage !== null) {
      setError(errorMessage.desc)
    }
  }

  const differentMobile = (event) => {
    event.preventDefault()
    // remove mobile from users profile
    const updatedProfile = removeUnverifiedContact(session.profile, mobile)
    // perform a remove on verified if user has chosen to go back after already validating
    dispatch(setProfile(removeVerifiedContact(updatedProfile, mobile)))
    // user is going back - pass the mobile given back
    // we need this incase they go back again so we can
    // remove it from the profile
    navigate('/signup/contactpreferences/mobile/add', {
      state: {
        mobile
      }
    })
  }

  const skipValidation = (event) => {
    event.preventDefault()
    // remove mobile from verified list if user is going back after validating
    const updatedProfile = removeVerifiedContact(session.profile, mobile)
    // we will need to add the mobile back to the unverified list - if it already exists
    // nothing will happen and it will remain
    dispatch(setProfile(addUnverifiedContact(updatedProfile, 'mobile', mobile)))
    navigate('/signup/contactpreferences/mobile/skipconfirmation')
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <PhaseBanner />
            <Link onClick={differentMobile} className='govuk-back-link'>
              Back
            </Link>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l govuk-!-margin-top-6'>
              Check your mobile phone
            </h1>

            <div className='govuk-body'>
              <p>We've sent a text with a code to:</p>
              <InsetText text={mobile} />
              <p>Use the code within 4 hours or it will expire</p>
              <Input
                inputType='text'
                value={code}
                name='Enter code'
                onChange={(val) => setCode(val)}
                error={error}
                className='govuk-input govuk-input--width-10'
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleSubmit}
              />
              &nbsp; &nbsp;
              <Link onClick={skipValidation} className='govuk-link'>
                Skip and confirm later
              </Link>
              <br />
              <Link onClick={getNewCode} className='govuk-link'>
                Get a new code
              </Link>
              <br />
              <br />
              <Link onClick={differentMobile} className='govuk-link'>
                Enter a different mobile number
              </Link>
              <div className='govuk-!-margin-bottom-9' />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
