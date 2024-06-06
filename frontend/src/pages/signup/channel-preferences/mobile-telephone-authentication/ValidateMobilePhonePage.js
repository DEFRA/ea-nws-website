import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  addVerifiedContact,
  removeUnverifiedContact
} from '../../../../services/ProfileServices'
import { authCodeValidation } from '../../../../services/validations/AuthCodeValidation'

export default function ValidateMobilePhone () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [code, setCode] = useState('')
  const mobile = location.state.mobile
  const [error, setError] = useState('')
  const session = useSelector((state) => state.session)

  const handleSubmit = async () => {
    const validationError = authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const data = {
        authToken: session.authToken,
        msisdn: mobile,
        code
      }
      const { errorMessage } = await backendCall(
        data,
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
        if (session.selectedContactPreferences.includes('Email')) {
          // navigate to email TODO - cameron add this once merged
        } else if (session.selectedContactPreferences.includes('PhoneCall')) {
          navigate('/signup/contactpreferences/landline')
        } else {
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
    console.log(errorMessage)
    if (errorMessage !== null) {
      setError(errorMessage.desc)
    }
  }

  const differentMobile = (event) => {
    event.preventDefault()
    // remove mobile from users profile
    dispatch(setProfile(removeUnverifiedContact(session.profile, mobile)))
    navigate('/signup/contactpreferences/mobile/add')
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <PhaseBanner />
            <Link
              to='/signup/contactpreferences/mobile/add'
              className='govuk-back-link'
            >
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
              <Link
                to='/signup/contactpreferences/mobile/skipconfirmation'
                state={{
                  mobile
                }}
                className='govuk-link'
              >
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
