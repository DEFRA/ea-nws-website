import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import Button from '../../components/gov-uk/Button'
import ErrorSummary from '../../components/gov-uk/ErrorSummary'
import Input from '../../components/gov-uk/Input'
import InsetText from '../../components/gov-uk/InsetText'
import NotificationBanner from '../../components/gov-uk/NotificationBanner'
import { setProfile } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import {
  addUnverifiedContact,
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../services/ProfileServices'
import { authCodeValidation } from '../../services/validations/AuthCodeValidation'
import ExpiredCodeLayout from './ExpiredCodeLayout'

export default function ValidateEmailLayout ({
  NavigateToNextPage,
  SkipValidation,
  DifferentEmail,
  NavigateToPreviousPage,
  buttonText,
  changeSignIn,
  updateProfile,
  profileError
}) {
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const authToken = useSelector((state) => state.session.authToken)
  const session = useSelector((state) => state.session)
  const email = session.currentContact
  const [codeResent, setCodeResent] = useState(false)
  const [codeResentTime, setCodeResentTime] = useState(new Date())
  const [codeExpired, setCodeExpired] = useState(false)

  // if error remove code sent notification
  useEffect(() => {
    setCodeResent(false)
  }, [error])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const dataToSend = { authToken, email, code }
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/add_contact/email/validate'
      )
      if (errorMessage !== null) {
        if (errorMessage === 'The code you have entered has expired - please request a new code') {
          setCodeExpired(true)
        } else {
          setError(errorMessage)
        }
      } else {
        if (changeSignIn) {
          updateProfile(data.profile, authToken)
          setError(profileError)
        } else {
          dispatch(setProfile(data.profile))
          NavigateToNextPage()
        }
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const data = { authToken: session.authToken, email }
    const { errorMessage } = await backendCall(
      data,
      'api/add_contact/email/add',
      navigate
    )
    if (errorMessage !== null) {
      setError(errorMessage)
    } else {
      setCodeResent(true)
      setCodeResentTime(new Date().toLocaleTimeString())
      setCodeExpired(false)
    }
  }

  const skipValidation = (event) => {
    event.preventDefault()
    // remove email from verified list if user is going back after validating

    const updatedProfile = removeVerifiedContact(session.profile, email)
    // we will need to add the email back to the unverified list - if it already exists
    // nothing will happen and it will remain
    dispatch(setProfile(addUnverifiedContact(updatedProfile, 'email', email)))
    SkipValidation(email)
  }

  const differentEmail = (event) => {
    event.preventDefault()
    removeEmailFromProfile()
    DifferentEmail(email)
  }

  const backLink = (event) => {
    event.preventDefault()
    removeEmailFromProfile()
    NavigateToPreviousPage()
  }

  const removeEmailFromProfile = async () => {
    let updatedProfile
    if (session.profile.unverified.emails.some(unverifiedEmail => unverifiedEmail.address === email)) {
      updatedProfile = removeUnverifiedContact(session.profile, email)
      dispatch(setProfile(removeUnverifiedContact(session.profile, email)))
    }
    if (session.profile.emails.includes(email)) {
      updatedProfile = removeVerifiedContact(session.profile, email)
      dispatch(setProfile(removeVerifiedContact(session.profile, email)))
    }

    const dataToSend = { profile: updatedProfile, authToken: session.authToken }

    const { errorMessage } = await backendCall(
      dataToSend,
      'api/profile/update',
      navigate
    )
    if (errorMessage !== null) {
      setError(errorMessage)
    }
  }

  return (
    <>
      {codeExpired
        ? (<ExpiredCodeLayout getNewCode={getNewCode} />)
        : (
          <>
            <BackLink onClick={backLink} />
            <main className='govuk-main-wrapper govuk-!-padding-top-4'>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-two-thirds'>
                  {codeResent && <NotificationBanner
                    className='govuk-notification-banner govuk-notification-banner--success'
                    title='Success'
                    text={'New code sent at ' + codeResentTime}
                                 />}
                  {error && <ErrorSummary errorList={[error]} />}
                  <h2 className='govuk-heading-l'>Check your email</h2>
                  <div className='govuk-body'>
                    {changeSignIn && (
                      <p className='govuk-body'>
                        You need to confirm your email address.
                      </p>
                    )}
                    <p className='govuk-body govuk-!-margin-bottom-5'>
                      We've sent an email with a code to:
                      <InsetText text={email} />
                      {changeSignIn ? 'Enter' : 'Use'} the code within 4 hours or
                      it will expire.
                    </p>
                    <Input
                      className='govuk-input govuk-input--width-10'
                      name='Enter code'
                      inputType='text'
                      error={error}
                      onChange={(val) => setCode(val)}
                    />
                    <Button
                      className='govuk-button'
                      text={buttonText}
                      onClick={handleSubmit}
                    />
                    {changeSignIn
                      ? (
                        <>
                          <Link
                            onClick={differentEmail}
                            className='govuk-link inline-link'
                          >
                            Enter a different email
                          </Link>
                          <br />
                          <Link onClick={getNewCode} className='govuk-link'>
                            Get a new code
                          </Link>
                        </>
                        )
                      : (
                        <>
                          <Link
                            onClick={skipValidation}
                            className='govuk-link inline-link'
                          >
                            Skip and confirm later
                          </Link>
                          <br />
                          <Link onClick={getNewCode} className='govuk-link'>
                            Get a new code
                          </Link>
                          <br /> <br />
                          <Link onClick={differentEmail} className='govuk-link'>
                            Enter a different email
                          </Link>
                        </>
                        )}
                  </div>
                </div>
              </div>
            </main>
          </>
          )}
    </>
  )
}
