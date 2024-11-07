import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import InsetText from '../../../common/components/gov-uk/InsetText'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  addUnverifiedContact,
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../../common/services/ProfileServices'
import { authCodeValidation } from '../../../common/services/validations/AuthCodeValidation'
import ExpiredCodeLayout from '../../../common/layouts/email/ExpiredCodeLayout'

export default function ValidateLandlineLayout ({
  NavigateToNextPage,
  SkipValidation,
  DifferentHomePhone,
  NavigateToPreviousPage
}) {
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const profile = useSelector((state) => state.session.profile)
  const homePhone = useSelector((state) => state.session.currentContact)
  const authToken = useSelector((state) => state.session.authToken)
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
      const dataToSend = { authToken, msisdn: homePhone, code }
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/add_contact/landline/validate',
        navigate
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
        dispatch(setProfile(data.profile))
        NavigateToNextPage()
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const data = { authToken, msisdn: homePhone }
    const { errorMessage } = await backendCall(
      data,
      'api/add_contact/landline/add',
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
    // remove homephone from verified list if user is going back after validating
    const updatedProfile = removeVerifiedContact(profile, homePhone)
    // we will need to add the homephone back to the unverified list - if it already exists
    // nothing will happen and it will remain
    dispatch(
      setProfile(addUnverifiedContact(updatedProfile, 'homePhones', homePhone))
    )
    SkipValidation(homePhone)
  }

  const differentHomePhone = async (event) => {
    event.preventDefault()
    removeLandlineFromProfile()
    DifferentHomePhone()
  }

  const backLink = async (event) => {
    event.preventDefault()
    removeLandlineFromProfile()
    NavigateToPreviousPage()
  }

  const removeLandlineFromProfile = async () => {
    let updatedProfile
    if (
      profile.unverified.homePhones.some(
        (unverifiedHomePhone) => unverifiedHomePhone.address === homePhone
      )
    ) {
      updatedProfile = removeUnverifiedContact(profile, homePhone)
      dispatch(setProfile(removeUnverifiedContact(profile, homePhone)))
    }
    if (profile.homePhones.includes(homePhone)) {
      updatedProfile = removeVerifiedContact(profile, homePhone)
      dispatch(setProfile(removeVerifiedContact(profile, homePhone)))
    }
    const dataToSend = { profile: updatedProfile, authToken }
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
        ? (
          <ExpiredCodeLayout getNewCode={getNewCode} />
          )
        : (
          <>
            <BackLink onClick={backLink} />
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
                  <h2 className='govuk-heading-l'>Confirm telephone number</h2>
                  <div className='govuk-body'>
                    We're calling this number to read out a code:
                    <InsetText text={homePhone} />
                    Use the code within 4 hours or it will expire.
                    <br /> <br />
                    <Input
                      name='Enter code'
                      inputType='text'
                      error={error}
                      onChange={(val) => setCode(val)}
                    />
                    <Button
                      className='govuk-button'
                      text='Continue'
                      onClick={handleSubmit}
                    />
                    <Link
                      onClick={skipValidation}
                      className='govuk-link'
                      style={{
                        display: 'inline-block',
                        padding: '8px 10px 7px'
                      }}
                    >
                      Skip and confirm later
                    </Link>
                    <br />
                    <Link onClick={getNewCode} className='govuk-link'>
                      Get a new code
                    </Link>
                    <br /> <br />
                    <Link onClick={differentHomePhone} className='govuk-link'>
                      Enter a different telephone number
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
