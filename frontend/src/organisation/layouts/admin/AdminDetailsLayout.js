import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
import { updateAdditionals } from '../../../common/services/ProfileServices'
import { emailValidation } from '../../../common/services/validations/EmailValidation'
import { fullNameValidation } from '../../../common/services/validations/FullNameValidation'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function AdminDetailsLayout({
  navigateToNextPage,
  NavigateToPreviousPage
}) {
  const dispatch = useDispatch()
  const [errorFullName, setErrorFullName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const profile = useSelector((state) => state.session.profile)
  const [fullName, setFullName] = useState(
    profile?.firstname && profile?.lastname
      ? `${profile.firstname} ${profile.lastname}`
      : ''
  )
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const organization = useSelector((state) => state.session.organization)
  const organizationAdditionals = JSON.parse(organization.description)
  const isAdmin = organizationAdditionals.isAdminRegistering

  const fullNameId = 'full-name'
  const emailAddressId = 'email-address'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorFullName('')
    setErrorEmail('')
    const fullNameValidationError = fullNameValidation(fullName)
    const emailValidationError = emailValidation(email)

    if (fullNameValidationError !== '' || emailValidationError !== '') {
      setErrorFullName(
        !isAdmin && fullNameValidationError !== ''
          ? 'Enter their full name'
          : fullNameValidationError
      )
      setErrorEmail(
        !isAdmin && emailValidationError === 'Enter your email address'
          ? 'Enter their email address'
          : emailValidationError
      )

      return
    }

    // Split the full name into first name and last name assuming they are separeted by a space.
    // if the string cannot be split then only the first name is set and the last name remains blank
    const [firstname, ...lastnameParts] = fullName.trim().split(' ')
    const lastname = lastnameParts.join(' ')

    // Start org registration in geosafe
    const dataToSend = { name: organization.name, email }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/org/sign_up_start',
      navigate
    )

    if (errorMessage !== null) {
      if (errorMessage === 'email already registered') {
        navigate(orgSignUpUrls.admin.duplicateEmail, {
          state: { email }
        })
      } else if (errorMessage === 'organisation already registered') {
        navigate(orgSignUpUrls.duplicateOrgName, {
          state: { name: organization.name }
        })
      } else {
        setErrorEmail(errorMessage)
      }
    } else {
      let updatedProfile = {
        ...profile,
        emails: [email],
        firstname,
        lastname
      }

      // required to send admin users to initial login screen at sign in
      updatedProfile = updateAdditionals(updatedProfile, [
        { id: 'firstLogin', value: { s: 'true' } }
      ])

      dispatch(setProfile(updatedProfile))
      dispatch(setRegisterToken(data.orgRegisterToken))
      dispatch(setCurrentContact(email))
      navigateToNextPage()
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <Helmet>
        {isAdmin ? (
          <title>
            Enter your details - Get flood warnings (professional) - GOV.UK
          </title>
        ) : (
          <title>
            Enter details for the main administrator - Get flood warnings
            (professional) - GOV.UK
          </title>
        )}
      </Helmet>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(errorFullName || errorEmail) && (
              <ErrorSummary
                errorList={[
                  errorFullName && {
                    text: errorFullName,
                    componentId: fullNameId
                  },
                  errorEmail && {
                    text: errorEmail,
                    componentId: emailAddressId
                  }
                ].filter(Boolean)}
              />
            )}
            {isAdmin ? (
              <h1 className='govuk-heading-l' id='main-content'>
                Enter your details
              </h1>
            ) : (
              <h1 className='govuk-heading-l' id='main-content'>
                Enter details for main administrator
              </h1>
            )}
            <div className='govuk-body'>
              {isAdmin ? (
                <p className='govuk-hint'>
                  You'll be able to set up flood warnings, locations and users.
                </p>
              ) : (
                <p className='govuk-hint'>
                  An administrator can set up flood warning, locations and
                  users. They will also receive flood messages for every
                  locations they set up.
                </p>
              )}
              <Input
                id={fullNameId}
                name='Full name'
                inputType='text'
                value={fullName}
                onChange={(val) => setFullName(val)}
                error={errorFullName}
                className='govuk-input govuk-input--width-20 govuk-typography-weight-bold'
                defaultValue={fullName}
                isNameBold
              />
              <Input
                id={emailAddressId}
                name='Email address'
                inputType='text'
                inputMode='email'
                value={email}
                onChange={(val) => setEmail(val)}
                error={errorEmail}
                className='govuk-input govuk-input--width-20'
                defaultValue={email}
                isNameBold
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
