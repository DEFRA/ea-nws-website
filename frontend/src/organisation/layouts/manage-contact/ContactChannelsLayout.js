import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'

import { Link } from 'react-router-dom'
import UserType from '../../../common/enums/UserType'
import {
  setOrgCurrentContactEmails,
  setOrgCurrentContactHomePhones,
  setOrgCurrentContactMobilePhones
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { emailValidation } from '../../../common/services/validations/EmailValidation'
import { phoneValidation } from '../../../common/services/validations/PhoneValidation'

export default function ContactChannelsLayout({
  navigateToNextPage,
  error,
  setError
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [emailError, setEmailError] = useState(['', ''])
  const [homePhoneError, setHomePhoneError] = useState(['', ''])
  const [mobilePhoneError, setMobilePhoneError] = useState(['', ''])
  const [emailInput, setEmailInput] = useState(
    useSelector((state) => state.session.orgCurrentContact.emails) || []
  )
  const [mobileInput, setMobileInput] = useState(
    useSelector((state) => state.session.orgCurrentContact.mobilePhones || [])
  )
  const [homeInput, setHomeInput] = useState(
    useSelector((state) => state.session.orgCurrentContact.homePhones || [])
  )
  const role = useSelector((state) => state.session.orgCurrentContact.role)
  const pendingRole = useSelector(
    (state) => state.session.orgCurrentContact.pendingRole
  )
  const userType = role || pendingRole
  const addingAdmin = useSelector((state) => state.session.addingAdminFlow)
  const profile = useSelector((state) => state.session.profile)
  const firstname = useSelector(
    (state) => state.session.orgCurrentContact.firstname
  )
  const lastname = useSelector(
    (state) => state.session.orgCurrentContact.lastname
  )
  const orgId = useSelector((state) => state.session.orgId)
  const originalEmails =
    useSelector((state) => state.session.orgCurrentContact.emails) || []

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  useEffect(() => {
    if (
      error &&
      (emailInput[0] ||
        emailInput[1] ||
        mobileInput[0] ||
        mobileInput[1] ||
        homeInput[0] ||
        homeInput[1])
    ) {
      setError('')
    }
  }, [emailInput, error, homeInput, mobileInput])

  useEffect(() => {
    setEmailError((errs) => ['', errs[1]])
  }, [emailInput[0]])
  useEffect(() => {
    setEmailError((errs) => [errs[0], ''])
  }, [emailInput[1]])
  useEffect(() => {
    setHomePhoneError((errs) => ['', errs[1]])
  }, [homeInput[0]])
  useEffect(() => {
    setHomePhoneError((errs) => [errs[0], ''])
  }, [homeInput[1]])
  useEffect(() => {
    setMobilePhoneError((errs) => ['', errs[1]])
  }, [mobileInput[0]])
  useEffect(() => {
    setMobilePhoneError((errs) => [errs[0], ''])
  }, [mobileInput[1]])

  const fetchEmailsAlreadyAdded = async () => {
    let emailsAlreadyAdded = []
    try {
      const dataToSend = { orgId }
      const contactsData = await backendCall(
        dataToSend,
        'api/elasticache/list_contacts',
        navigate
      )
      contactsData.data.forEach((contact) => {
        emailsAlreadyAdded.push(...contact.emails)
      })
    } catch (e) {
      console.error(e)
    }

    return emailsAlreadyAdded
  }

  const validateData = async () => {
    let dataValid = true

    const validateEmailAndCheckDuplicate = async (email, first) => {
      if (email) {
        const emailValid = emailValidation(email)
        if (emailValid) {
          first
            ? setEmailError((errs) => [
                'Enter email address 1 in the correct format, like name@example.com',
                errs[1]
              ])
            : setEmailError((errs) => [
                errs[0],
                'Enter email address 2 in the correct format, like name@example.com'
              ])
        }
        const emailsAlreadyAdded = await fetchEmailsAlreadyAdded()
        // create array of only changed emails
        const emailsChanged = emailInput.filter(
          (email) => !originalEmails.includes(email)
        )
        // check for duplicates only if email has changed
        if (emailsChanged.includes(email)) {
          if (!emailsAlreadyAdded.includes(email)) {
            return true
          } else {
            first
              ? setEmailError((errs) => [
                  'This email is already registered to another user',
                  errs[1]
                ])
              : setEmailError((errs) => [
                  errs[0],
                  'This email is already registered to another user'
                ])
            return false
          }
        } else {
          return true
        }
      }
      return true
    }

    const validatePhone = (phone, type, first) => {
      if (phone) {
        const phoneValid = phoneValidation(phone, type)
        if (phoneValid) {
          if (type === 'mobile') {
            first
              ? setMobilePhoneError((errs) => [
                  'Enter 1st UK mobile telephone number in the correct format,  like 07700 900 982',
                  errs[1]
                ])
              : setMobilePhoneError((errs) => [
                  errs[0],
                  'Enter 2nd UK mobile telephone number in the correct format,  like 07700 900 982'
                ])
          } else {
            first
              ? setHomePhoneError((errs) => [
                  'Enter 1st UK telephone number in the correct format, like 01632 960 001 or  07700 900 982',
                  errs[1]
                ])
              : setHomePhoneError((errs) => [
                  errs[0],
                  'Enter 2nd UK telephone number in the correct format, like 01632 960 001 or  07700 900 982'
                ])
          }
        }
        return phoneValid === ''
      }
      return true
    }

    if (
      !emailInput[0] &&
      !emailInput[1] &&
      !mobileInput[0] &&
      !mobileInput[1] &&
      !homeInput[0] &&
      !homeInput[1]
    ) {
      setError(
        'Enter at least 1 email address, mobile number or telephone number'
      )
      return false
    }

    if (emailInput[0] && emailInput[0] === emailInput[1]) {
      setEmailError((errs) => [errs[0], 'Enter a different email'])
      return false
    }

    if (mobileInput[0] && mobileInput[0] === mobileInput[1]) {
      setMobilePhoneError((errs) => [
        errs[0],
        'Enter a different telephone number'
      ])
      return false
    }

    if (homeInput[0] && homeInput[0] === homeInput[1]) {
      setHomePhoneError((errs) => [
        errs[0],
        'Enter a different telephone number'
      ])
      return false
    }

    dataValid &= await validateEmailAndCheckDuplicate(emailInput[0], true)
    dataValid &= await validateEmailAndCheckDuplicate(emailInput[1])
    dataValid &= validatePhone(mobileInput[0], 'mobile', true)
    dataValid &= validatePhone(mobileInput[1], 'mobile')
    dataValid &= validatePhone(homeInput[0], 'mobileAndLandline', true)
    dataValid &= validatePhone(homeInput[1], 'mobileAndLandline')
    return dataValid
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const dataValid = await validateData()
    if (dataValid) {
      const newEmails = []
      if (emailInput[0] != null && emailInput[0]?.length !== 0) {
        newEmails.push(emailInput[0])
      }
      if (emailInput[1] != null && emailInput[1]?.length !== 0) {
        newEmails.push(emailInput[1])
      }
      dispatch(setOrgCurrentContactEmails(newEmails))

      const newMobilePhones = []
      if (mobileInput[0] != null && mobileInput[0]?.length !== 0) {
        newMobilePhones.push(mobileInput[0])
      }
      if (mobileInput[1] != null && mobileInput[1]?.length !== 0) {
        newMobilePhones.push(mobileInput[1])
      }
      dispatch(setOrgCurrentContactMobilePhones(newMobilePhones))

      const newHomePhones = []
      if (homeInput[0] != null && homeInput[0]?.length !== 0) {
        newHomePhones.push(homeInput[0])
      }
      if (homeInput[1] != null && homeInput[1]?.length !== 0) {
        newHomePhones.push(homeInput[1])
      }
      dispatch(setOrgCurrentContactHomePhones(newHomePhones))

      setEmailError(['', ''])
      setHomePhoneError(['', ''])
      setMobilePhoneError(['', ''])
      setError('')

      navigateToNextPage()
    }
  }

  const renderFirstEmail = () => {
    // admin user being added
    if (addingAdmin) {
      return (
        <div className='govuk-inset-text'>
          <strong>Main email address</strong>
          <br />
          {emailInput[0]}
          <br />
          <br />
          <div className='govuk-hint'>For sign in and flood messages</div>
        </div>
      )
    }

    // admin user editing self
    if (userType === UserType.Admin && profile.emails[0] === emailInput[0]) {
      return (
        <Input
          id='additional-email'
          name='Additionals email address (optional)'
          inputType='text'
          onChange={(val) => setEmailInput((inputs) => [inputs[0], val])}
          value={emailInput[1]}
          error={emailError[1]}
          className='govuk-input govuk-input--width-20'
          isNameBold
          labelSize='s'
        />
      )
    }

    // admin user editing another admin user
    if (userType === UserType.Admin && profile.emails[0] !== emailInput[0]) {
      return (
        <div className='govuk-inset-text'>
          <strong>Main email address</strong>
          <br />
          {emailInput[0]}
          <br />
          <br />
          <div className='govuk-hint'>
            For sign in and flood messages. Only {firstname + ' ' + lastname}{' '}
            can change this.
          </div>
        </div>
      )
    }

    // pending admin user
    return (
      <div className='govuk-inset-text'>
        <strong>Main email address (pending admin)</strong>
        <br />
        {emailInput[0]}
        <br />
        <br />
        <div className='govuk-hint'>For sign in and flood messages.</div>
        <br />
        <br />
        <div className='govuk-hint'>
          To change this, you must{' '}
          <Link className='govuk-link'>withdraw their invitation</Link> to join
          as admin and re-invite them.
        </div>
      </div>
    )
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(error ||
              emailError[0] ||
              homePhoneError[0] ||
              mobilePhoneError[0] ||
              emailError[1] ||
              homePhoneError[1] ||
              mobilePhoneError[1]) && (
              <ErrorSummary
                errorList={[
                  error,
                  emailError,
                  homePhoneError,
                  mobilePhoneError
                ]}
              />
            )}
            <h1 className='govuk-heading-l'>Email addresses and numbers</h1>
            <div className='govuk-body'>
              <div>
                <p>
                  We'll send flood messages to all the emails and numbers
                  provided.
                </p>
                {userType === UserType.Contact && (
                  <p>
                    You need to add at least one way for contacts to get flood
                    messages.
                  </p>
                )}
              </div>
              <div
                className={error && 'govuk-form-group govuk-form-group--error'}
              >
                {error && (
                  <p
                    id='govuk-text-input-error'
                    className='govuk-error-message'
                  >
                    {error}
                  </p>
                )}
                {addingAdmin ||
                userType === UserType.Admin ||
                userType === UserType.PendingAdmin ? (
                  <>
                    {renderFirstEmail()}
                    <Input
                      id='additional-email'
                      name='Additionals email address (optional)'
                      inputType='text'
                      onChange={(val) =>
                        setEmailInput((inputs) => [inputs[0], val])
                      }
                      value={emailInput[1]}
                      error={emailError[1]}
                      className='govuk-input govuk-input--width-20'
                      isNameBold
                      labelSize='s'
                    />
                  </>
                ) : (
                  <>
                    <Input
                      id='email-addresses'
                      name='Email addresses (optional)'
                      inputType='text'
                      onChange={(val) =>
                        setEmailInput((inputs) => [val, inputs[1]])
                      }
                      value={emailInput[0]}
                      error={emailError[0]}
                      className='govuk-input govuk-input--width-20'
                      isNameBold
                      labelSize='s'
                    />
                    <Input
                      inputType='text'
                      onChange={(val) =>
                        setEmailInput((inputs) => [inputs[0], val])
                      }
                      value={emailInput[1]}
                      error={emailError[1]}
                      className='govuk-input govuk-input--width-20'
                    />
                  </>
                )}

                <Input
                  id='uk-mobile-numbers'
                  name='UK mobile numbers for text messages (optional)'
                  inputType='text'
                  onChange={(val) =>
                    setMobileInput((inputs) => [val, inputs[1]])
                  }
                  value={mobileInput[0]}
                  className='govuk-input govuk-input--width-20'
                  isNameBold
                  labelSize='s'
                  error={mobilePhoneError[0]}
                />
                <Input
                  inputType='text'
                  onChange={(val) =>
                    setMobileInput((inputs) => [inputs[0], val])
                  }
                  value={mobileInput[1]}
                  className='govuk-input govuk-input--width-20'
                  error={mobilePhoneError[1]}
                />
                <Input
                  id='uk-telephone-numbers'
                  name='UK telephone numbers for voice messages (optional)'
                  inputType='text'
                  onChange={(val) => setHomeInput((inputs) => [val, inputs[1]])}
                  className='govuk-input govuk-input--width-20'
                  isNameBold
                  labelSize='s'
                  value={homeInput[0]}
                  error={homePhoneError[0]}
                />
                <Input
                  inputType='text'
                  onChange={(val) => setHomeInput((inputs) => [inputs[0], val])}
                  className='govuk-input govuk-input--width-20'
                  value={homeInput[1]}
                  error={homePhoneError[1]}
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
