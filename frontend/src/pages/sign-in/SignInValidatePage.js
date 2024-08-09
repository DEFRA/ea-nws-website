import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ExpiredCodeLayout from '../../common-layouts/expired-code/ExpiredCodeLayout'
import NotCompletedSigningUpLayout from '../../common-layouts/sign-up/NotCompletedSignUpLayout'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import InsetText from '../../gov-uk-components/InsetText'
import NotificationBanner from '../../gov-uk-components/NotificationBanner'
import {
  setAuthToken,
  setContactPreferences,
  setProfile,
  setRegistrations
} from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import { authCodeValidation } from '../../services/validations/AuthCodeValidation'

export default function SignInValidatePage () {
  const location = useLocation()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const signinToken = location.state.signinToken
  const [codeResent, setCodeResent] = useState(false)
  const [codeResentTime, setCodeResentTime] = useState(new Date())
  const [codeExpired, setCodeExpired] = useState(false)
  const [signUpNotComplete, setSignUpNotComplete] = useState(false)
  const [lastAccessedUrl, setLastAccessedUrl] = useState('')

  // if error remove code sent notification
  useEffect(() => {
    setCodeResent(false)
  }, [error])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const dataToSend = { signinToken, code }
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/sign_in_validate'
      )

      if (errorMessage !== null) {
        if (errorMessage === 'The code you have entered has expired - please request a new code') {
          setCodeExpired(true)
        } else {
          setError(errorMessage)
        }
      } else {
        dispatch(setAuthToken(data.authToken))
        dispatch(setProfile(data.profile))
        dispatch(setRegistrations(data.registrations))
        dispatch(setContactPreferences([
          data.profile.emails.length !== 0 && 'Email Address',
          data.profile.homePhones.length !== 0 && 'PhoneCall',
          data.profile.mobilePhones.length !== 0 && 'Text'
        ]))

        const isSignUpComplete = data.profile.additionals.filter(c => c.id === 'signUpComplete')[0]?.value
        const lastAccessedUrl = data.profile.additionals.filter(c => c.id === 'lastAccessedUrl')[0]?.value
        setLastAccessedUrl(lastAccessedUrl)

        if (!isSignUpComplete && lastAccessedUrl !== undefined) {
          setSignUpNotComplete(true)
        } else {
          navigate('/home')
        }
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const data = { email: location.state.email }
    const { errorMessage } = await backendCall(data, 'api/sign_in', navigate)

    if (errorMessage !== null) {
      setError(errorMessage)
    }

    setCodeResent(true)
    setCodeResentTime(new Date().toLocaleTimeString())
    setCodeExpired(false)
  }

  return (
    <>
      {codeExpired || signUpNotComplete
        ? (codeExpired && <ExpiredCodeLayout getNewCode={getNewCode} />) || (signUpNotComplete && <NotCompletedSigningUpLayout nextPage={lastAccessedUrl} />)
        : (
          <div className='page-container'>
            <Header />
            <div class='govuk-width-container body-container'>
              <Link to='/signin' className='govuk-back-link'>Back</Link>
              {codeResent &&
                <NotificationBanner
                  className='govuk-notification-banner govuk-notification-banner--success'
                  title='Success'
                  text={'New code sent at ' + codeResentTime}
                />}
              {error && <ErrorSummary errorList={[error]} />}
              <h2 class='govuk-heading-l'>Check your email</h2>
              <div class='govuk-body'>
                We've sent a code to:
                <InsetText text={location.state.email} />
                <Input
                  name='Enter code'
                  inputType='text'
                  value={code}
                  error={error}
                  onChange={(val) => setCode(val)}
                />
                <Button
                  className='govuk-button'
                  text='Continue'
                  onClick={handleSubmit}
                />
                <br />
                <Link onClick={getNewCode} className='govuk-link'>
                  Get a new code
                </Link>
              </div>
            </div>
            <Footer />
          </div>
          )}
    </>
  )
}
