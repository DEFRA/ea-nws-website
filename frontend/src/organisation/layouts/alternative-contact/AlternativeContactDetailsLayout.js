import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { setProfile } from '../../../common/redux/userSlice'
import {
  getOrganisationAdditionals,
  updateOrganisationAdditionals
} from '../../../common/services/ProfileServices'
import { emailValidation } from '../../../common/services/validations/EmailValidation'
import { fullNameValidation } from '../../../common/services/validations/FullNameValidation'
import { phoneValidation } from '../../../common/services/validations/PhoneValidation'

export default function AlternativeContactDetailsLayout({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const dispatch = useDispatch()
  const [errorFullName, setErrorFullName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorTelephone, setErrorTelephone] = useState('')
  const session = useSelector((state) => state.session)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephoneNumber] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  let organisation = Object.assign(
    {},
    getOrganisationAdditionals(session.profile)
  )
  const isAdmin = organisation.isAdminRegistering

  const handleSubmit = async (event) => {
    event.preventDefault()
    const fullNameValidationError = fullNameValidation(fullName)
    const emailValidationError = emailValidation(email)
    const telephoneValidationError = phoneValidation(
      telephone,
      'mobileAndLandline'
    )

    if (
      fullNameValidationError !== '' ||
      emailValidationError !== '' ||
      telephoneValidationError !== ''
    ) {
      setErrorFullName(fullNameValidationError)
      setErrorEmail(emailValidationError)
      setErrorTelephone(telephoneValidationError)
    } else {
      setErrorFullName('')
      setErrorEmail('')
      setErrorTelephone('')

      // Split the full name into first name and last name assuming they are separeted by a space.
      // if the string cannot be split then only the first name is set and the last name remains blank
      const [firstname, ...lastnameParts] = fullName.trim().split(' ')
      const lastname = lastnameParts.join(' ')

      const updatedOrganisation = {
        ...organisation,
        alternativeContact: {
          firstName: firstname,
          lastName: lastname,
          email: email,
          telephone: telephone,
          jobTitle: jobTitle
        }
      }

      const updatedProfile = updateOrganisationAdditionals(
        session.profile,
        updatedOrganisation
      )
      dispatch(setProfile(updatedProfile))
      NavigateToNextPage() // TODO send to T&Ms
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
            {(errorFullName || errorEmail || errorTelephone) && (
              <ErrorSummary
                errorList={[errorFullName, errorEmail, errorTelephone]}
              />
            )}
            <h1 className='govuk-heading-l'>
              Enter details for an alternative contact at your organisation
            </h1>
            <div className='govuk-body'>
              {isAdmin ? (
                <p className='govuk-body govuk-!-margin-bottom-5'>
                  This person will be an alternative contact, in case you're
                  unavailable in the future. They will not be given
                  administrator rights.
                </p>
              ) : (
                <p className='govuk-body govuk-!-margin-bottom-5'>
                  This person will be an alternative contact, in case{' '}
                  {session.profile.firstname} {session.profile.lastname} is
                  unavailable in the future. They will not be given
                  administrator rights.
                </p>
              )}
              <label className='govuk-label govuk-label--m' htmlFor='full-name'>
                Full name
              </label>
              <Input
                inputType='text'
                value={fullName}
                id='full-name'
                onChange={(val) => setFullName(val)}
                error={errorFullName}
                className='govuk-input govuk-input--width-20'
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
              />
              <label
                className='govuk-label govuk-label--m'
                htmlFor='email-address'
              >
                Telephone number
              </label>
              <Input
                inputType='text'
                value={telephone}
                id='telephone-number'
                error={errorTelephone}
                onChange={(val) => setTelephoneNumber(val)}
                className='govuk-input govuk-input--width-20'
              />
              <label className='govuk-label govuk-label--m' htmlFor='job-title'>
                Job title (optional)
              </label>
              <Input
                inputType='text'
                value={jobTitle}
                id='job-title'
                onChange={(val) => setJobTitle(val)}
                className='govuk-input govuk-input--width-20'
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
