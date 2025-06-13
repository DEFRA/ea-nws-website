import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import { setProfile } from '../../../common/redux/userSlice'
import { addAccountName } from '../../../common/services/ProfileServices'
import { fullNameValidation } from '../../../common/services/validations/FullNameValidation'

export default function AddAccountNameLayout({
  navigateToNextPage,
  NavigateToPreviousPage,
  buttonText,
  changeName,
  updateProfile,
  profileError
}) {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const session = useSelector((state) => state.session)
  const authToken = session.authToken
  const [fullName, setFullName] = useState(
    session.profile?.firstname && session.profile?.lastname
      ? `${session.profile.firstname} ${session.profile.lastname}`
      : ''
  )
  const location = useLocation()
  const fullNameInputId = 'full-name'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = fullNameValidation(fullName)
    setError(validationError)

    if (validationError === '') {
      // Split the full name into first name and last name assuming they are separated by a space.
      // if the string cannot be split then only the first name is set and the last name remains blank
      const [firstname, ...lastnameParts] = fullName.trim().split(' ')
      const lastname = lastnameParts.join(' ')

      const profile = addAccountName(session.profile, firstname, lastname)
      dispatch(setProfile(profile))

      updateProfile(profile, authToken)
      if (profileError) setError(profileError)
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <Helmet>
        <title>Enter your name - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          {location?.state?.banner && (
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success'
              title='Success'
              heading={location?.state?.banner?.heading}
              text={location?.state?.banner?.text}
            />
          )}
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[{ text: error, componentId: fullNameInputId }]} />}
            <h2 className='govuk-heading-l' id='main-content'>
              {changeName ? 'Change your name' : 'Enter your name'}
            </h2>
            <div className='govuk-body'>
              <p className='govuk-body govuk-!-margin-bottom-5'>
                We'll use this name if we need to contact you about your
                account.
              </p>
              <Input
                id={fullName}
                inputType='text'
                value={fullName}
                name='Full name'
                onChange={(val) => setFullName(val)}
                error={error}
                className='govuk-input govuk-input--width-20'
                defaultValue={fullName}
              />
              <Button
                text={buttonText}
                className='govuk-button'
                onClick={handleSubmit}
              />
              {changeName && (
                <Link
                  onClick={navigateBack}
                  className='govuk-body govuk-link inline-link'
                  style={{ cursor: 'pointer' }}
                >
                  Cancel
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
