import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import Input from '../../../common/components/gov-uk/Input'
import Radio from '../../../common/components/gov-uk/Radio'
import { backendCall } from '../../../common/services/BackendService'
import { orgManageContactsUrls } from '../../routes/manage-contacts/ManageContactsRoutes'

export default function PromoteToAdminPage() {
  const navigate = useNavigate()
  const [selectedEmail, setSelectedEmail] = useState('')

  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const contactName = currentContact?.firstname + ' ' + currentContact?.lastname
  const contactEmails = currentContact?.emails

  const emailCount = contactEmails?.length || 0

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

  const handleSubmit = async () => {
    const updatedContact = { ...currentContact, pendingRole: 'ADMIN' }

    const dataToSend = { authToken, orgId, contact: updatedContact }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/organization/update_contact',
      navigate
    )

    navigate(orgManageContactsUrls.view.dashboard, {
      state: {
        successMessage: [
          `Email invitation sent to ${selectedEmail}`,
          "They'll be a pending admin until they accept the invitation and confirm their email address. Invitation is valid for 72 hours."
        ]
      }
    })
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-body'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
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
