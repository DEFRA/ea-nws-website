import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../common/components/gov-uk/Input'
import store from '../../../../common/redux/store'
import {
  setOrgCurrentContact,
  setOrgCurrentContactEmails
} from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { emailValidation } from '../../../../common/services/validations/EmailValidation'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactEmailPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [emailError, setEmailError] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const location = useLocation()
  const orgId = useSelector((state) => state.session.orgId)
  const authToken = useSelector((state) => state.session.authToken)
  const [errors, setErrors] = useState([])

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const checkMandatory = () => {
    let mandatoryMissing = false
    if (!emailInput) {
      setEmailError('Enter email address')
      mandatoryMissing = true
    }
    return mandatoryMissing
  }

  const validateData = () => {
    let dataValid = true
    const mandatoryMissing = checkMandatory()
    if (emailError || mandatoryMissing) {
      dataValid = false
    } else {
      const emailValidationError = emailValidation(emailInput)
      if (emailValidationError) {
        setEmailError(
          'Enter an email address in the correct format, like name@example.com'
        )
        dataValid = false
      }
    }

    return dataValid
  }

  const addContact = async () => {
    const listDataToSend = { orgId }
    const originalContacts = await backendCall(
      listDataToSend,
      'api/elasticache/list_contacts',
      navigate
    )

    const contactToAdd = JSON.parse(
      JSON.stringify(store.getState().session.orgCurrentContact)
    )
    const dataToSend = { authToken, orgId, contacts: [contactToAdd] }
    const { errorMessage: addContactError } = await backendCall(
      dataToSend,
      'api/organization/create_contacts',
      navigate
    )

    if (!addContactError) {
      const newContacts = await backendCall(
        listDataToSend,
        'api/elasticache/list_contacts',
        navigate
      )

      const newContact = newContacts.data.filter(
        (x) => !originalContacts.data.some((c) => c.id === x.id)
      )
      if (newContact && newContact.length > 0) {
        contactToAdd.id = newContact[0].id
      }
      dispatch(setOrgCurrentContact(contactToAdd))
    }
    return addContactError
  }

  const inviteContact = async () => {
    const contactToPromote = JSON.parse(
      JSON.stringify(store.getState().session.orgCurrentContact)
    )
    const promoteData = {
      authToken,
      contactId: contactToPromote.id,
      role: 'ADMIN',
      orgId
    }

    const { errorMessage: promoteError, data: contactData } = await backendCall(
      promoteData,
      'api/organization/promote_contact',
      navigate
    )

    if (!promoteError) {
      // update currentContact since it will now be a pending admin
      dispatch(setOrgCurrentContact(contactData))
    }

    return promoteError
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const dataValid = validateData()
    if (dataValid) {
      dispatch(setOrgCurrentContactEmails([emailInput]))
      const addContactError = await addContact()
      const inviteContactError = await inviteContact()
      if (!addContactError && !inviteContactError) {
        navigate(orgManageContactsUrls.add.additionalInformation)
      } else {
        const errorArray = []
        addContactError && errorArray.push(addContactError)
        inviteContactError && errorArray.push(inviteContactError)
        setErrors(errorArray)
      }
    }
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(emailError || errors.length > 0) && (
              <ErrorSummary errorList={[emailError, ...errors]} />
            )}
            <h1 className='govuk-heading-l'>Enter email address</h1>
            <div className='govuk-body'>
              <p className='govuk-!-margin-bottom-5'>
                We'll invite them by email to join as an admin.
              </p>
              <p className='govuk-!-margin-bottom-5'>
                This will also be their sign in email address.
              </p>
              <div
                className={
                  emailError && 'govuk-form-group govuk-form-group--error'
                }
              >
                <Input
                  name='Email address'
                  inputType='text'
                  onChange={(val) => {
                    setErrors([])
                    setEmailError('')
                    setEmailInput(val)
                  }}
                  value={emailInput}
                  error={emailError}
                  className='govuk-input govuk-input--width-20'
                  isNameBold
                  labelSize='s'
                />
              </div>
              <div className='govuk-!-margin-top-8'>
                <Button
                  text='Continue'
                  className='govuk-button'
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
