import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../common/components/gov-uk/Input'
import Radio from '../../../../common/components/gov-uk/Radio'
import { setOrgCurrentContact } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { webToGeoSafeContact } from '../../../../common/services/formatters/ContactFormatter'
import { emailValidation } from '../../../../common/services/validations/EmailValidation'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function PromoteToAdminPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const contactName = currentContact?.firstname + ' ' + currentContact?.lastname
  const contactEmails = currentContact?.emails

  const emailCount = contactEmails?.length || 0

  const [selectedEmail, setSelectedEmail] = useState(
    emailCount === 1 ? contactEmails[0] : ''
  )
  const [errorMessage, setErrorMessage] = useState('')

  let heading, emailRadios
  switch (true) {
    case emailCount === 0:
      heading = `Add email address to invite ${contactName} as admin`
      break
    case emailCount > 1:
      heading = `Which email address should we use to invite ${contactName} as admin?`
      emailRadios = (
        <div className='govuk-radios'>
          {contactEmails.map((email, index) => (
            <Radio
              key={`email_radio_${index}`}
              name='emailSelection'
              value={email}
              label={email}
              onChange={() => setSelectedEmail(email)}
            />
          ))}
          <br />
        </div>
      )
      break
    default:
      heading = `Confirm email address to invite ${contactName} as admin`
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = emailValidation(selectedEmail)
    setErrorMessage(validationError)
    if (validationError === '') {
      const updatedContact = JSON.parse(
        JSON.stringify(webToGeoSafeContact(currentContact))
      )
      if (updatedContact.emails.length === 0) {
        updatedContact.emails.push(selectedEmail)
      } else if (updatedContact.emails.length === 1) {
        // user updated primary email
        if (selectedEmail !== updatedContact.emails[0]) {
          updatedContact.emails[0] = selectedEmail
        }
      } else {
        // move email selected to receive notification to front of array
        const index = updatedContact.emails.indexOf(selectedEmail)
        if (index > 0) {
          updatedContact.emails.splice(index, 1)
          updatedContact.emails.unshift(selectedEmail)
        }
      }

      const dataToSend = { authToken, orgId, contact: updatedContact }
      const { errorMessage: updateError } = await backendCall(
        dataToSend,
        'api/organization/update_contact',
        navigate
      )

      if (!updateError) {
        const promoteData = {
          authToken,
          contactId: updatedContact.id,
          role: 'ADMIN',
          orgId
        }
        const { errorMessage: promoteError, data: contactData } =
          await backendCall(
            promoteData,
            'api/organization/promote_contact',
            navigate
          )
        if (!promoteError) {
          // update currentContact since it will now be a pending admin
          dispatch(setOrgCurrentContact(contactData))
          navigate(orgManageContactsUrls.view.dashboard, {
            state: {
              successMessage: [
                `Email invitation sent to ${selectedEmail}`,
                "They'll be a pending admin until they accept the invitation and confirm their email address. Invitation is valid for 72 hours."
              ]
            }
          })
        } else {
          setErrorMessage(promoteError)
        }
      } else {
        setErrorMessage(updateError)
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>{heading} - Manage users - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-body'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            {errorMessage && <ErrorSummary errorList={[errorMessage]} />}
            <h1 className='govuk-heading-l govuk-!-margin-top-3'>{heading}</h1>
            <p className='govuk-body'>
              They'll also use this for sign in and flood messages.
            </p>
            <p className='govuk-body govuk-!-margin-bottom-6'>
              They'll continue to get any flood messages they're currently
              receiving, as a contact.
            </p>

            {emailCount > 1 ? (
              emailRadios
            ) : (
              <Input
                id='email-address'
                inputType='text'
                value={selectedEmail}
                name='Email address'
                onChange={(val) => setSelectedEmail(val)}
                className='govuk-input govuk-input--width-20'
                isNameBold
              />
            )}
            <Button
              text='Invite as admin'
              className='govuk-button'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
