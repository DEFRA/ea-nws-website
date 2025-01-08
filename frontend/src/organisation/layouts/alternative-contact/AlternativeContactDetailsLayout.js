import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { setOrganizationAlternativeContact } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { emailValidation } from '../../../common/services/validations/EmailValidation'
import { fullNameValidation } from '../../../common/services/validations/FullNameValidation'
import { phoneValidation } from '../../../common/services/validations/PhoneValidation'

export default function AlternativeContactDetailsLayout ({
  navigateToNextPage,
  NavigateToPreviousPage
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errorFullName, setErrorFullName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorTelephone, setErrorTelephone] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephoneNumber] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const profile = useSelector((state) => state.session.profile)
  const organization = useSelector((state) => state.session.organization)
  const organizationAdditionals = JSON.parse(organization.description)
  const isAdmin = organizationAdditionals.isAdminRegistering

  useEffect(() => {
    setErrorFullName('')
  }, [fullName])

  useEffect(() => {
    setErrorEmail('')
  }, [email])

  useEffect(() => {
    setErrorTelephone('')
  }, [telephone])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const fullNameValidationError = fullNameValidation(fullName)
    const emailValidationError = emailValidation(email)
    const telephoneValidationError = phoneValidation(
      telephone,
      'mobileAndLandline'
    )

    const dataToSend = { email }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/sign_up_start',
      navigate
    )

    if (errorMessage === 'email already registered') {
      setErrorEmail(
        'The email address you entered is already being used. Enter a different email address.'
      )
    } else if (
      fullNameValidationError !== '' ||
      emailValidationError !== '' ||
      telephoneValidationError !== ''
    ) {
      setErrorFullName(fullNameValidationError)
      setErrorEmail(emailValidationError)
      setErrorTelephone(telephoneValidationError)
    } else if (email === profile.emails[0]) {
      // alternative contact cannot be the same as the main admin email
      setErrorEmail(
        'Enter a different email address to the main administrator email.'
      )
    } else {
      // Split the full name into first name and last name assuming they are separeted by a space.
      // if the string cannot be split then only the first name is set and the last name remains blank
      const [firstname, ...lastnameParts] = fullName.trim().split(' ')
      const lastname = lastnameParts.join(' ')

      dispatch(setOrganizationAlternativeContact({
        firstName: firstname,
        lastName: lastname,
        email,
        telephone,
        jobTitle
      }))
      navigateToNextPage()
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(errorFullName || errorEmail || errorTelephone) && (
              <ErrorSummary
                errorList={[errorFullName, errorEmail, errorTelephone]}
              />
            )}
            <h1 className='govuk-heading-l'>
              Enter details for an alternative contact at your organisation
            </h1>
            <div className='govuk-body'>
              {isAdmin
                ? (
                  <p className='govuk-body govuk-!-margin-bottom-5'>
                    This person will be an alternative contact, in case you're
                    unavailable in the future. They will not be given
                    administrator rights.
                  </p>
                  )
                : (
                  <p className='govuk-body govuk-!-margin-bottom-5'>
                    This person will be an alternative contact, in case{' '}
                    {profile.firstname} {profile.lastname} is
                    unavailable in the future. They will not be given
                    administrator rights.
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
                isNameBold
              />
              <Input
                inputType='text'
                value={email}
                name='Email address'
                onChange={(val) => setEmail(val)}
                error={errorEmail}
                className='govuk-input govuk-input--width-20'
                isNameBold
              />
              <Input
                inputType='text'
                value={telephone}
                name='Telephone number'
                error={errorTelephone}
                onChange={(val) => setTelephoneNumber(val)}
                className='govuk-input govuk-input--width-20'
                isNameBold
              />
              <Input
                inputType='text'
                value={jobTitle}
                name='Job title (optional)'
                onChange={(val) => setJobTitle(val)}
                className='govuk-input govuk-input--width-20'
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
