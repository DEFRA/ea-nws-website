import * as React from 'react'
import { useState } from 'react'
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

export default function AddLandlinePhonePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  // if user is going back through flow = show them their previously entered homePhone
  const [homePhone, setHomePhone] = useState(
    location.state ? location.state.homePhone : ''
  )
  const [error, setError] = useState('')
  const session = useSelector((state) => state.session)
  const authToken = useSelector((state) => state.session.authToken)

  const handleSubmit = async () => {
    const validationError = phoneValidation(homePhone, 'mobileAndLandline')
    setError(validationError)
    // should also do a check here to make sure this number isnt already in the users profile
    // add this in when working on the pages that allows a user to go back and update their number
    // at sign up flow - we dont want the number already validated being tried again
    if (validationError === '') {
      const dataToSend = { msisdn: homePhone, authToken }
      const { errorMessage } = await backendCall(
        dataToSend,
        'api/add_contact/landline/add'
      )
      if (errorMessage !== null) {
        setError(errorMessage)
      } else {
        const normalisedPhoneNumber = normalisePhoneNumber(homePhone)
        // add landline to unverified list
        dispatch(
          setProfile(
            addUnverifiedContact(
              session.profile,
              'homePhones',
              normalisedPhoneNumber
            )
          )
        )
        navigate('/signup/contactpreferences/landline/validate')
      }
    }
  }

  // if user is going back through the signup flow - we want to remove the home phone
  // from either the verified or unverified list - we need to do both incase
  // they progressed past the validate home phone path
  const removeLandlineFromProfile = async (event) => {
    event.preventDefault()
    // we need to check if location.state has a value - this will only hold a value
    // if the user has come from the home phone validate page - we will need to remove
    // the number from the users profile if so
    if (location.state) {
      event.preventDefault()
      const normalisedHomePhone = normalisePhoneNumber(location.state.homePhone)
      // remove mobile from users profile
      const updatedProfile = removeUnverifiedContact(
        session.profile,
        normalisedHomePhone
      )
      dispatch(
        setProfile(removeVerifiedContact(updatedProfile, normalisedHomePhone))
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
            <Link
              onClick={removeLandlineFromProfile}
              className='govuk-back-link'
            >
              Back
            </Link>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l govuk-!-margin-top-6'>
              Enter a telephone number to get flood messages by phone call
            </h1>
            <p className='govuk-body'>
              We recommend using a landline or mobile number that can be called
              24 hours a day
            </p>
            <Input
              inputType='text'
              value={homePhone}
              name='UK landline or mobile telephone number'
              onChange={(val) => setHomePhone(val)}
              className='govuk-input govuk-input--width-20'
              error={error}
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
