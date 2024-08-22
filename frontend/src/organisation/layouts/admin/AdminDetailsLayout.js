import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { setProfile } from '../../../common/redux/userSlice'
import { addAccountName } from '../../../common/services/ProfileServices'
import { emailValidation } from '../../../common/services/validations/EmailValidation'
import { fullNameValidation } from '../../../common/services/validations/FullNameValidation'

export default function AdminDetailsLayout({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const location = useLocation()
  const dispatch = useDispatch()
  const [errorFullName, setErrorFullName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const session = useSelector((state) => state.session)
  const [fullName, setFullName] = useState(
    session.profile?.firstname && session.profile?.lastname
      ? `${session.profile.firstname} ${session.profile.lastname}`
      : ''
  )
  const [email, setEmail] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const fullNameValidationError = fullNameValidation(fullName)
    const emailValidationError = emailValidation(email)

    if (fullNameValidationError !== '' || emailValidationError !== '') {
      setErrorFullName(location.state.isAdmin ? fullNameValidationError : '')
      setErrorEmail(
        location.state.isAdmin
          ? emailValidationError
          : 'Enter their email address'
      )
    } else {
      // Split the full name into first name and last name assuming they are separeted by a space.
      // if the string cannot be split then only the first name is set and the last name remains blank
      const [firstname, ...lastnameParts] = fullName.trim().split(' ')
      const lastname = lastnameParts.join(' ')

      const profile = addAccountName(session.profile, firstname, lastname)
      dispatch(setProfile(profile))

      console.log('Laurent - AdminDetailsLayout, current Profile shows:')
      console.log(profile)

      NavigateToNextPage(email)
    }
  }

  const navigateBack = async (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(errorFullName || errorEmail) && (
              <ErrorSummary errorList={[errorFullName, errorEmail]} />
            )}
            {location.state.isAdmin ? (
              <h1 className='govuk-heading-l'>Enter your details</h1>
            ) : (
              <h1 className='govuk-heading-l'>
                Enter details for main administrator
              </h1>
            )}
            <div className='govuk-body'>
              {location.state.isAdmin ? (
                <p className='govuk-body govuk-!-margin-bottom-5'>
                  You'll be able to set up flood warning, locations and users.
                  You will also receive flood messages for every locations you
                  set up.
                </p>
              ) : (
                <p className='govuk-body govuk-!-margin-bottom-5'>
                  An administrator can set up flood warning, locations and
                  users. they will also receive flood messages for every
                  locations they set up.
                </p>
              )}
              <Input
                inputType='text'
                value={fullName}
                name='Full name'
                onChange={(val) => setFullName(val)}
                error={errorFullName}
                className='govuk-input govuk-input--width-20'
                defaultValue={fullName}
              />
              <Input
                inputType='text'
                value={email}
                name='Email Address'
                onChange={(val) => setEmail(val)}
                error={errorEmail}
                className='govuk-input govuk-input--width-20'
                defaultValue={email}
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
