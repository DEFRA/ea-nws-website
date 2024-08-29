import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import {
  setCurrentContact,
  setProfile,
  setRegisterToken
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  addAccountName,
  addVerifiedContact
} from '../../../common/services/ProfileServices'
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
  const navigate = useNavigate()

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

      // Add the main admin email to the unverified component
      const dataToSend = { email }
      const { data, errorMessage } = await backendCall(
        dataToSend,
        'api/sign_up_start',
        navigate
      )

      if (errorMessage !== null) {
        if (errorMessage === 'email already registered') {
          navigate('/signup/duplicate', {
            state: { email }
          })
        } else {
          setErrorEmail(errorMessage)
        }
      } else {
        // add email to  emails list
        const updatedProfile = addVerifiedContact(profile, 'email', email)
        dispatch(setProfile(updatedProfile))
        dispatch(setRegisterToken(data.registerToken))
        dispatch(setCurrentContact(email))
        NavigateToNextPage(location.state.isAdmin)
      }
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
                <p className='govuk-hint'>
                  You'll be able to set up flood warning, locations and users.
                  You will also receive flood messages for every locations you
                  set up.
                </p>
              ) : (
                <p className='govuk-hint'>
                  An administrator can set up flood warning, locations and
                  users. they will also receive flood messages for every
                  locations they set up.
                </p>
              )}
              <label className='govuk-label govuk-label--m' htmlFor='full-name'>
                Full name
              </label>
              <Input
                inputType='text'
                id='full-name'
                value={fullName}
                onChange={(val) => setFullName(val)}
                error={errorFullName}
                className='govuk-input govuk-input--width-20 govuk-typography-weight-bold'
                defaultValue={fullName}
              />
              <label
                className='govuk-label govuk-label--m'
                htmlFor='email-address'
              >
                Email address
              </label>
              <Input
                inputType='text'
                value={email}
                id='email-address'
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
