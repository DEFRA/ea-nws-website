import React, { useState, useEffect } from 'react'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Button from '../../../../common/components/gov-uk/Button'
import Input from '../../../../common/components/gov-uk/Input'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { emailValidation } from '../../../../common/services/validations/EmailValidation'
import { fullNameValidation } from '../../../../common/services/validations/FullNameValidation'
import { backendCall } from '../../../../common/services/BackendService'
import { addUnverifiedContact, addAccountName } from '../../../../common/services/ProfileServices'
import { setCurrentContact, setProfile } from '../../../../common/redux/userSlice'
export default function ChangeAdminDetailsPage () {
  const dispatch = useDispatch()
  const currentFirstName = useSelector(
    (state) => state.session.profile.firstname
  )
  const currentLastName = useSelector(
    (state) => state.session.profile.lastname
  )
  const currentEmail = useSelector(
    (state) => state.session.profile.emails[0]
  )

  const [email, setEmail] = useState(currentEmail)
  const [fullName, setFullName] = useState(currentFirstName + ' ' + currentLastName)
  const navigate = useNavigate()
  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const session = useSelector((state) => state.session)
  const authToken = session.authToken

  useEffect(() => {
    setErrorEmail('')
  }, [errorEmail])

  useEffect(() => {
    setErrorName('')
  }, [errorName])

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const hasNameChanged = () => {
    if (fullName !== currentFirstName + ' ' + currentLastName) {
      return true
    } else {
      return false
    }
  }

  const hasEmailChanged = () => {
    if (email !== currentEmail) {
      return true
    } else {
      return false
    }
  }

  const updateEmail = async () => {
    const emailValidationError = emailValidation(email)
    setErrorEmail(emailValidationError)
    if (emailValidationError === '') {
      const dataToSend = { email, authToken }
      const profile = addUnverifiedContact(session.profile, 'email', email)
      const profileDataToSend = { profile, authToken }
      const { errorMessage, data } = await backendCall(
        profileDataToSend,
        'api/profile/update',
        navigate
      )
      if (errorMessage !== null) {
        setErrorEmail(errorMessage)
      } else {
        dispatch(setProfile(data.profile))
        const { errorMessage } = await backendCall(
          dataToSend,
          'api/add_contact/email/add',
          navigate
        )
        if (errorMessage !== null) {
          setErrorEmail(errorMessage)
        } else {
          dispatch(setCurrentContact(email))
        }
      }
    }
  }

  const updateName = () => {
    const validationError = fullNameValidation(fullName)
    setErrorName(validationError)
    if (validationError === '') {
      const [firstname, ...lastnameParts] = fullName.trim().split(' ')
      const lastname = lastnameParts.join(' ')
      const profile = addAccountName(session.profile, firstname, lastname)
      dispatch(setProfile(profile))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // fix how the erros work here
    if (errorEmail === '' || !errorName === '') {
      if (hasEmailChanged() && hasNameChanged()) {
        updateName()
        updateEmail()
      } else if (hasEmailChanged() && !hasNameChanged()) {
        updateEmail()
        navigate('To next page')
      } else if (!hasEmailChanged() && hasNameChanged()) {
        updateName()
        navigate('To next page')
      } else {
        navigate('To next page')
      }
    }
  }
  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half' />
          {(errorEmail || errorName) && (
            <ErrorSummary
              errorList={[errorEmail, errorName]}
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
            defaultValue={fullName}
            isNameBold
          />

          <Input
            inputType='text'
            value={email}
            name='Email address'
            onChange={(val) => setEmail(val)}
            error={errorEmail}
            className='govuk-input govuk-input--width-20'
            defaultValue={email}
            isNameBold
          />

          <Button
            text='Save'
            className='govuk-button'
            onClick={handleSubmit}
          />
        </div>
      </main>
    </>
  )
}
