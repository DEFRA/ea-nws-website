import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../common/components/gov-uk/Input'
import { setCurrentContact, setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { addAccountName, addUnverifiedContact } from '../../../../common/services/ProfileServices'
import { emailValidation } from '../../../../common/services/validations/EmailValidation'
import { fullNameValidation } from '../../../../common/services/validations/FullNameValidation'
import { orgAccountUrls } from '../../../routes/account/AccountRoutes'
export default function ChangeAdminDetailsPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentFirstName = useSelector(
    (state) => state.session.profile.firstname
  )
  const currentLastName = useSelector(
    (state) => state.session.profile.lastname
  )
  const currentEmail = useSelector(
    (state) => state.session.profile.emails[0]
  )

  const currentFullName = currentFirstName + ' ' + currentLastName

  const [email, setEmail] = useState(null)
  const [fullName, setFullName] = useState(null)
  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [error, setError] = useState('')
  const profile = useSelector((state) => state.session.profile)
  const authToken = useSelector((state) => state.session.authToken)
  const signinType = useSelector((state) => state.session.authToken)

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const updateProfile = async (profile, authToken, signinType) => {
    const dataToSend = { profile, authToken, signinType }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/profile/update',
      navigate
    )
    if (errorMessage !== null) {
      setError(errorMessage)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let emailValidationError = ''
    if (email !== null) {
      emailValidationError = emailValidation(email)
      setErrorEmail(emailValidationError)
    }
    let fullNameValidationError = ''
    if (fullName !== null) {
      fullNameValidationError = fullNameValidation(fullName)
      setErrorName(fullNameValidationError)
    }

    if (emailValidationError === '' && fullNameValidationError === '') {
      let updatedProfile = { ...profile }
      const successMessages = []
      if (fullName) {
        const [firstname, ...lastnameParts] = fullName.trim().split(' ')
        const lastname = lastnameParts.join(' ')
        updatedProfile = addAccountName(updatedProfile, firstname, lastname)
        successMessages.push('Name changed')
      }
      if (email) {
        updatedProfile = addUnverifiedContact(updatedProfile, 'email', email)
        successMessages.push('Email address changed')
      }
      await updateProfile(updatedProfile, authToken, signinType)
      if (email) {
        const dataToSend = { email, authToken }
        const { errorMessage } = await backendCall(
          dataToSend,
          'api/add_contact/email/add',
          navigate
        )
        if (errorMessage !== null) {
          setError(errorMessage)
        } else {
          dispatch(setCurrentContact(email))
        }
      }
      if (!error) {
        dispatch(setProfile(updatedProfile))
        if (email) {
          navigate(orgAccountUrls.admin.verifyEmail, {
            state: {
              successMessages
            }
          })
        } else {
          navigate(orgAccountUrls.admin.details, {
            state: {
              successMessages
            }
          })
        }
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Change administrator details - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half' />
          {(error || errorEmail || errorName) && (
            <ErrorSummary
              errorList={[error, errorEmail, errorName]}
            />
          )}
          <h1 className='govuk-heading-l'>
            Change administrator details
          </h1>

          <Input
            inputType='text'
            value={fullName}
            name='Full name'
            onChange={(val) => setFullName(val)}
            error={errorName}
            className='govuk-input govuk-input--width-20'
            defaultValue={currentFullName}
            isNameBold
          />

          <Input
            inputType='text'
            value={email}
            name='Email address'
            onChange={(val) => setEmail(val)}
            error={errorEmail}
            className='govuk-input govuk-input--width-20'
            defaultValue={currentEmail}
            isNameBold
          />

          <Button
            text='Continue'
            className='govuk-button'
            onClick={handleSubmit}
          />
        </div>
      </main>
    </>
  )
}
