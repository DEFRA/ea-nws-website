import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ExpiredCodeLayout from '../email/ExpiredCodeLayout'
import NotCompletedSigningUpLayout from '../../../citizen/layouts/sign-up/NotCompletedSignUpLayout'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import InsetText from '../../../common/components/gov-uk/InsetText'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import {
  setAuthToken,
  setContactPreferences,
  setProfile,
  setRegistrations
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { authCodeValidation } from '../../../common/services/validations/AuthCodeValidation'
import { getAdditionals } from '../../services/ProfileServices'

export default function SignInValidatePageLayout ({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const location = useLocation()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [signinToken, setSignInToken] = useState(location.state.signinToken)
  const [codeResent, setCodeResent] = useState(false)
  const [codeResentTime, setCodeResentTime] = useState(new Date())
  const [codeExpired, setCodeExpired] = useState(false)
  const [signUpNotComplete, setSignUpNotComplete] = useState(false)
  const [lastAccessedUrl, setLastAccessedUrl] = useState('')
  const signinType = useSelector((state) => state.session.signinType)

  // if error remove code sent notification
  useEffect(() => {
    setCodeResent(false)
  }, [error])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const dataToSend = { signinToken, code, signinType }
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/sign_in_validate'
      )

      if (errorMessage !== null) {
        if (
          errorMessage ===
          'The code you have entered has expired - please request a new code'
        ) {
          setCodeExpired(true)
        } else {
          setError(errorMessage)
        }
      } else {
        dispatch(setAuthToken(data.authToken))
        dispatch(setProfile(data.profile))
        dispatch(setRegistrations(data.registrations))
        dispatch(
          setContactPreferences([
            data.profile.emails.length !== 0 && 'Email Address',
            data.profile.homePhones.length !== 0 && 'PhoneCall',
            data.profile.mobilePhones.length !== 0 && 'Text'
          ])
        )

        const isSignUpComplete = getAdditionals(data.profile, 'signUpComplete')
        const lastAccessedUrl = getAdditionals(data.profile, 'lastAccessedUrl')
        setLastAccessedUrl(lastAccessedUrl)

        if (isSignUpComplete !== 'true' && lastAccessedUrl !== undefined) {
          setSignUpNotComplete(true)
        } else {
          NavigateToNextPage()
        }
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const dataToSend = { email: location.state.email }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/sign_in',
      navigate
    )

    if (errorMessage !== null) {
      setError(errorMessage)
    }

    setSignInToken(data.signinToken)
    setCodeResent(true)
    setCodeResentTime(new Date().toLocaleTimeString())
    setCodeExpired(false)
  }

  const navigateBack = async (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      {codeExpired || signUpNotComplete
        ? (
            (codeExpired && <ExpiredCodeLayout getNewCode={getNewCode} />) ||
        (signUpNotComplete && (
          <NotCompletedSigningUpLayout nextPage={lastAccessedUrl} />
        ))
          )
        : (
          <>
            <BackLink onClick={navigateBack} />
            <main className='govuk-main-wrapper govuk-!-padding-top-4'>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-two-thirds'>
                  {codeResent && (
                    <NotificationBanner
                      className='govuk-notification-banner govuk-notification-banner--success'
                      title='Success'
                      text={'New code sent at ' + codeResentTime}
                    />
                  )}
                  {error && <ErrorSummary errorList={[error]} />}
                  <h2 className='govuk-heading-l'>Confirm email address </h2>
                  <div className='govuk-body'>
                    We've sent an email with a code to:
                    <InsetText text={location.state.email} />
                    <Input
                      className='govuk-input govuk-input--width-10'
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
                  &nbsp; &nbsp;
                    <Link
                      onClick={navigateBack}
                      className='govuk-link inline-link'
                    >
                      Enter a different email
                    </Link>
                    <br />
                    <Link onClick={getNewCode} className='govuk-link'>
                      Get a new code
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </>
          )}
    </>
  )
}
