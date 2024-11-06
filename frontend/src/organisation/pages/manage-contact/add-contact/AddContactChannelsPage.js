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
import { phoneValidation } from '../../../../common/services/validations/PhoneValidation'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'
export default function AddContactChannelsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email1Error, setEmail1Error] = useState('')
  const [email2Error, setEmail2Error] = useState('')
  const [homePhone1Error, setHomePhone1Error] = useState('')
  const [homePhone2Error, setHomePhone2Error] = useState('')
  const [mobilePhone1Error, setMobilePhone1Error] = useState('')
  const [mobilePhone2Error, setMobilePhone2Error] = useState('')
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

  useEffect(() => {
    setEmail1Error('')
  }, [emailInput1])
  useEffect(() => {
    setEmail2Error('')
  }, [emailInput2])
  useEffect(() => {
    setHomePhone1Error('')
  }, [homeInput1])
  useEffect(() => {
    setHomePhone2Error('')
  }, [homeInput2])
  useEffect(() => {
    setMobilePhone1Error('')
  }, [mobileInput1])
  useEffect(() => {
    setMobilePhone2Error('')
  }, [mobileInput2])

  const validateData = () => {
    let dataValid = true

    const validateEmail = (email, first) => {
      if (email) {
        const emailValid = emailValidation(email)
        if (emailValid) {
          first
            ? setEmail1Error(
              'Enter email address 1 in the correct format, like name@example.com'
            )
            : setEmail2Error(
              'Enter email address 2 in the correct format, like name@example.com'
            )
        }
        return emailValid === ''
      }
      return true
    }

    const validatePhone = (phone, type, first) => {
      if (phone) {
        const phoneValid = phoneValidation(phone, type)
        if (phoneValid) {
          if (type === 'mobile') {
            first
              ? setMobilePhone1Error(
                'Enter 1st UK mobile telephone number in the correct format,  like 07700 900 982'
              )
              : setMobilePhone2Error(
                'Enter 2nd UK mobile telephone number in the correct format,  like 07700 900 982'
              )
          } else {
            first
              ? setHomePhone1Error(
                'Enter 1st UK telephone number in the correct format, like 01632 960 001 or  07700 900 982'
              )
              : setHomePhone2Error(
                'Enter 2nd UK telephone number in the correct format, like 01632 960 001 or  07700 900 982'
              )
          }
        }
        return phoneValid === ''
      }
      return true
    }

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
      return false
    }

    dataValid &= validateEmail(emailInput1, true)
    dataValid &= validateEmail(emailInput2)
    dataValid &= validatePhone(mobileInput1, 'mobile', true)
    dataValid &= validatePhone(mobileInput2, 'mobile')
    dataValid &= validatePhone(homeInput1, 'mobileAndLandline', true)
    dataValid &= validatePhone(homeInput2, 'mobileAndLandline')
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
      setEmail1Error('')
      setHomePhone1Error('')
      setMobilePhone1Error('')
      setEmail2Error('')
      setHomePhone2Error('')
      setMobilePhone2Error('')
      setError('')

      // TO DO - to notes
      navigate(orgManageContactsUrls.add.notes)
    }
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(error ||
              email1Error ||
              homePhone1Error ||
              mobilePhone1Error ||
              email2Error ||
              homePhone2Error ||
              mobilePhone2Error) && (
                <ErrorSummary
                  errorList={[
                    email1Error,
                    email2Error,
                    error,
                    mobilePhone1Error,
                    homePhone1Error,
                    mobilePhone2Error,
                    homePhone2Error
                  ]}
                />
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
                  error={email1Error}
                  className='govuk-input govuk-input--width-20'
                  isNameBold
                  labelSize='s'
                />
                <Input
                  inputType='text'
                  onChange={(val) => setEmailInput2(val)}
                  error={email2Error}
                  className='govuk-input govuk-input--width-20'
                />
                <Input
                  name='UK mobile numbers for text messages (optional)'
                  inputType='text'
                  onChange={(val) => setMobileInput1(val)}
                  className='govuk-input govuk-input--width-20'
                  isNameBold
                  labelSize='s'
                  error={mobilePhone1Error}
                />
                <Input
                  inputType='text'
                  onChange={(val) => setMobileInput2(val)}
                  className='govuk-input govuk-input--width-20'
                  error={mobilePhone2Error}
                />
                <Input
                  name='UK telephone numbers for voice messages (optional)'
                  inputType='text'
                  onChange={(val) => setHomeInput1(val)}
                  className='govuk-input govuk-input--width-20'
                  isNameBold
                  labelSize='s'
                  error={homePhone1Error}
                />
                <Input
                  inputType='text'
                  onChange={(val) => setHomeInput2(val)}
                  className='govuk-input govuk-input--width-20'
                  error={homePhone2Error}
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
