import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../common/components/gov-uk/Input'
import {
  setOrgCurrentContactEmails,
  setOrgCurrentContactMobilePhones
} from '../../../../common/redux/userSlice'
import { emailValidation } from '../../../../common/services/validations/EmailValidation'

export default function AddContactChannelsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [emailError, setEmailError] = useState('')
  const [error, setError] = useState('')
  const [emailInput1, setEmailInput1] = useState('')
  const [emailInput2, setEmailInput2] = useState('')
  const [mobileInput1, setMobileInput1] = useState('')
  const [mobileInput2, setMobileInput2] = useState('')
  const [homeInput1, setHomeInput1] = useState('')
  const [homeInput2, setHomeInput2] = useState('')
  const firstName = useSelector(
    (state) => state.session.orgCurrentContact.firstName
  )
  const lastName = useSelector(
    (state) => state.session.orgCurrentContact.lastName
  )

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  useEffect(() => {
    if (
      error &&
      (emailInput1 ||
        emailInput2 ||
        mobileInput1 ||
        mobileInput2 ||
        homeInput1 ||
        homeInput2)
    ) {
      setError('')
    }
  }, [
    emailInput1,
    emailInput2,
    error,
    homeInput1,
    homeInput2,
    mobileInput1,
    mobileInput2
  ])

  const validateData = () => {
    let dataValid = true
    if (
      !emailInput1 &&
      !emailInput2 &&
      !mobileInput1 &&
      !mobileInput2 &&
      !homeInput1 &&
      !homeInput2
    ) {
      setError(
        'Enter at least 1 email address, mobile number or telephone number'
      )
      dataValid = false
    }
    if (emailInput1) {
      const emailValid = emailValidation(emailInput1)
      setEmailError(emailValid)
      dataValid = emailValid === ''
    }
    if (emailInput2) {
      const emailValid = emailValidation(emailInput2)
      setEmailError(emailValid)
      dataValid = emailValid === ''
    }
    return dataValid
  }

  const handleSubmit = () => {
    const dataValid = validateData()
    if (dataValid) {
      const newEmails = []
      if (emailInput1) newEmails.push(emailInput1)
      if (emailInput2) newEmails.push(emailInput2)
      if (newEmails.length !== 0) {
        dispatch(setOrgCurrentContactEmails(newEmails))
      }
      const newMobilePhones = []
      if (mobileInput1) newMobilePhones.push(mobileInput1)
      if (mobileInput2) newMobilePhones.push(mobileInput2)
      if (newMobilePhones.length !== 0) {
        dispatch(setOrgCurrentContactMobilePhones(newMobilePhones))
      }
      const newHomePhones = []
      if (homeInput1) newHomePhones.push(homeInput1)
      if (homeInput2) newHomePhones.push(homeInput2)
      if (newHomePhones.length !== 0) {
        dispatch(setOrgCurrentContactMobilePhones(newHomePhones))
      }
      setEmailError('')
      console.log(newEmails)
      console.log(newHomePhones)
      console.log(newMobilePhones)
      // TO DO - to notes
      // navigate(-1)
    }
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(error || emailError) && (
              <ErrorSummary errorList={[emailError, error]} />
            )}
            <h1 className='govuk-heading-l'>
              Choose how you want {firstName || 'first'} {lastName || 'last'} to
              get flood messages
            </h1>
            <div className='govuk-body'>
              <div>
                You can add up to 2 email addresses, 2 mobile numbers and 2
                telephone numbers for each contact. Flood messages will be sent
                to all the emails and numbers provided.
                <br />
                <br />
                You need to add at least 1 way for contacts to get sent flood
                messages.
                <br />
                <br />
              </div>
              <div
                className={
                  error === '' ? '' : 'govuk-form-group govuk-form-group--error'
                }
              >
                {error !== '' && (
                  <p
                    id='govuk-text-input-error'
                    className='govuk-error-message'
                  >
                    {error}
                  </p>
                )}
                <Input
                  name='Email addresses (optional)'
                  inputType='text'
                  onChange={(val) => setEmailInput1(val)}
                  error={emailError}
                  className='govuk-input govuk-input--width-20'
                  isNameBold
                  labelSize='s'
                />
                <Input
                  inputType='text'
                  onChange={(val) => setEmailInput2(val)}
                  error={emailError}
                  className='govuk-input govuk-input--width-20'
                />
                <Input
                  name='UK mobile numbers for text messages (optional)'
                  inputType='text'
                  onChange={(val) => setMobileInput1(val)}
                  className='govuk-input govuk-input--width-20'
                  isNameBold
                  labelSize='s'
                />
                <Input
                  inputType='text'
                  onChange={(val) => setMobileInput2(val)}
                  className='govuk-input govuk-input--width-20'
                />
                <Input
                  name='UK telephone numbers for voice messages (optional)'
                  inputType='text'
                  onChange={(val) => setHomeInput1(val)}
                  className='govuk-input govuk-input--width-20'
                  isNameBold
                  labelSize='s'
                />
                <Input
                  inputType='text'
                  onChange={(val) => setHomeInput2(val)}
                  className='govuk-input govuk-input--width-20'
                />
              </div>
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
