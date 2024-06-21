import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import Input from '../../../../gov-uk-components/Input'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../../../redux/userSlice'
import { backendCall } from '../../../../services/BackendService'
import {
  addUnverifiedContact,
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../../../services/ProfileServices'
import { normalisePhoneNumber } from '../../../../services/formatters/NormalisePhoneNumber'
import { phoneValidation } from '../../../../services/validations/PhoneValidation'

export default function AddMobilePhonePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  // if user is going back through flow = show them their previously entered mobile
  const [mobile, setMobile] = useState(
    location.state ? location.state.mobile : ''
  )
  const [error, setError] = useState('')
  const session = useSelector((state) => state.session)

  const handleSubmit = async () => {
    const validationError = phoneValidation(mobile, 'mobile')
    setError(validationError)
    // should also do a check here to make sure this mobile isnt already in the users profile
    // add this in when working on the pages that allows a user to go back and update their mobile
    // at sign up flow - we dont want the mobile already validated being tried again
    if (validationError === '') {
      const data = { authToken: session.authToken, msisdn: mobile }
      const { errorMessage } = await backendCall(
        data,
        'api/add_contact/mobile/add',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage)
      } else {
        const normalisedMobile = normalisePhoneNumber(mobile)
        // add mobile to unverified list in profile
        dispatch(
          setProfile(
            addUnverifiedContact(session.profile, 'mobile', normalisedMobile)
          )
        )
        navigate('/signup/contactpreferences/mobile/validate')
      }
    }
  }

  // if user is going back through the signup flow - we want to remove the mobile
  // from either the verified or unverified list - we need to do both incase
  // they progressed past the validate mobile path
  const removeMobileFromProfile = async (event) => {
    event.preventDefault()
    // we need to check if location.state has a value - this will only hold a value
    // if the user has come from the mobile validate page - we will need to remove
    // the number from the users profile if so
    if (location.state) {
      event.preventDefault()
      const normalisedMobile = normalisePhoneNumber(location.state.mobile)
      // remove mobile from users profile
      const updatedProfile = removeUnverifiedContact(
        session.profile,
        normalisedMobile
      )
      dispatch(
        setProfile(removeVerifiedContact(updatedProfile, normalisedMobile))
      )
    }
    // user could have navigated from contact preferences page
    // or user could have come from account change details at the end of sign up flow
    navigate(-1)
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <Link onClick={removeMobileFromProfile} className='govuk-back-link'>
              Back
            </Link>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l govuk-!-margin-top-6'>
              Enter a mobile number to get flood messages by text
            </h1>
            <p className='govuk-body'>
              We recommend using a mobile number where we can reach you 24 hours
              a day
            </p>
            <Input
              inputType='text'
              value={mobile}
              name='UK mobile telephone number'
              onChange={(val) => setMobile(val)}
              error={error}
              className='govuk-input govuk-input--width-20'
            />
            <Button
              text='Continue'
              className='govuk-button'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
