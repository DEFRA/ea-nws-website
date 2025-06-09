import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import InsetText from '../../../common/components/gov-uk/InsetText'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import UserContactType from '../../../common/enums/UserContactType'
import ExpiredCodeLayout from '../../../common/layouts/email/ExpiredCodeLayout'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  addUnverifiedContact,
  removeUnverifiedContact,
  removeVerifiedContact,
  updateAdditionals
} from '../../../common/services/ProfileServices'
import { authCodeValidation } from '../../../common/services/validations/AuthCodeValidation'

export default function ValidateMobileLayout({
  navigateToNextPage,
  SkipValidation,
  DifferentMobile,
  NavigateToPreviousPage,
  isSignUpJourney = false
}) {
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [codeResent, setCodeResent] = useState(false)
  const [codeResentTime, setCodeResentTime] = useState(new Date())
  const [codeExpired, setCodeExpired] = useState(false)

  // if error remove code sent notification
  useEffect(() => {
    setCodeResent(false)
  }, [error])

  const profile = useSelector((state) => state.session.profile)
  const mobile = useSelector((state) => state.session.currentContact)
  const authToken = useSelector((state) => state.session.authToken)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { error: validationError, code: formattedCode } =
      authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const dataToSend = { authToken, code: formattedCode, msisdn: mobile }
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/add_contact/mobile/validate',
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
        let updatedProfile = data.profile
        if (isSignUpJourney) {
          // Set lastAccessedUrl explicitly for signup journey
          updatedProfile = updateAdditionals(updatedProfile, [
            { id: 'lastAccessedUrl', value: { s: '/signup/accountname/add' } }
          ])

          const profileUpdateResponse = await backendCall(
            { profile: updatedProfile, authToken },
            'api/profile/update',
            navigate
          )

          dispatch(setProfile(profileUpdateResponse.data.profile))
        } else {
          dispatch(setProfile(data.profile))
        }
        navigateToNextPage(mobile)
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const data = { authToken, msisdn: mobile }
    const { errorMessage } = await backendCall(
      data,
      'api/add_contact/mobile/add',
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
    const updatedProfile = removeVerifiedContact(
      profile,
      mobile,
      UserContactType.Mobile
    )
    // we will need to add the email back to the unverified list - if it already exists
    // nothing will happen and it will remain
    dispatch(setProfile(addUnverifiedContact(updatedProfile, 'mobile', mobile)))
    SkipValidation(mobile)
  }

  const differentMobile = (event) => {
    event.preventDefault()
    removeMobileFromProfile()
    DifferentMobile(mobile)
  }

  const backLink = (event) => {
    event.preventDefault()
    removeMobileFromProfile()
    NavigateToPreviousPage()
  }

  const removeMobileFromProfile = async () => {
    let updatedProfile
    if (
      profile.unverified.mobilePhones.some(
        (unverifiedMobilePhone) => unverifiedMobilePhone.address === mobile
      )
    ) {
      updatedProfile = removeUnverifiedContact(
        profile,
        mobile,
        UserContactType.Mobile
      )
      dispatch(
        setProfile(
          removeUnverifiedContact(profile, mobile, UserContactType.Mobile)
        )
      )
    }
    if (profile.mobilePhones.includes(mobile)) {
      updatedProfile = removeVerifiedContact(
        profile,
        mobile,
        UserContactType.Mobile
      )
      dispatch(
        setProfile(
          removeVerifiedContact(profile, mobile, UserContactType.Mobile)
        )
      )
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
      {codeExpired ? (
        <ExpiredCodeLayout getNewCode={getNewCode} />
      ) : (
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
                <h2 className='govuk-heading-l'>Check your mobile phone</h2>
                <div className='govuk-body'>
                  We've sent a text with a code to:
                  <InsetText text={mobile} />
                  Use the code within 4 hours or it will expire.
                  <br /> <br />
                  <Input
                    id='enter-code'
                    className='govuk-input govuk-input--width-10'
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
                      padding: '8px 10px 7px',
                      cursor: 'pointer'
                    }}
                  >
                    Skip and confirm later
                  </Link>
                  <br />
                  <Link
                    onClick={getNewCode}
                    className='govuk-link'
                    style={{ cursor: 'pointer' }}
                  >
                    Get a new code
                  </Link>
                  <br /> <br />
                  <Link
                    onClick={differentMobile}
                    className='govuk-link'
                    style={{ cursor: 'pointer' }}
                  >
                    Enter a different mobile
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
