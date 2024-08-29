import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { emailValidation } from '../../../common/services/validations/EmailValidation'
import { fullNameValidation } from '../../../common/services/validations/FullNameValidation'
import { phoneValidation } from '../../../common/services/validations/PhoneValidation'

export default function AlternativeContactDetailsLayout({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const location = useLocation()
  const dispatch = useDispatch()
  const [errorFullName, setErrorFullName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorTelephone, setErrorTelephone] = useState('')
  const [errorJobTitle, setErrorJobTitle] = useState('')
  const session = useSelector((state) => state.session)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephoneNumber] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const navigate = useNavigate()

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
    }
    //NavigateToNextPage() // TODO send to Org duplication main admin email page
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
                Enter details for an alternative contact at your organisation
              </h1>
            )}
            <div className='govuk-body'>
              {location.state.isAdmin ? (
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
                error={errorJobTitle}
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
