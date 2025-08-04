import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import { backendCall } from '../../../../common/services/BackendService'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function RemoveAdminPage() {
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.session.authToken)

  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const contactName = currentContact?.firstname + ' ' + currentContact?.lastname
  const contactEmail = currentContact?.emails[0]

  const adminName =
    `${useSelector((state) => state.session.profile.firstname)} ${useSelector(
      (state) => state.session.profile.lastname
    )}` || ''
  const adminEmail = useSelector((state) => state.session.profile.emails[0])

  const handleSubmit = async () => {
    try {
      const dataToSend = { authToken, contactId: currentContact.id }
      const { errorMessage } = await backendCall(
        dataToSend,
        'api/organization/demote_contact',
        navigate
      )

      if (errorMessage) {
        throw new Error(errorMessage)
      }

      const emailParams = {
        email: contactEmail,
        name: contactName,
        adminName,
        adminEmail
      }

      await backendCall(emailParams, 'api/notify/admin_removed', navigate)

      navigate(orgManageContactsUrls.view.dashboard, {
        state: {
          successMessage: [
            `${contactName} is no longer and admin but is now a contact. They'll still get the same flood messages as before.`
          ]
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Helmet>
        <title>Remove {contactName} as admin - Manage users - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-body'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            <h1
              className='govuk-heading-l govuk-!-margin-top-3'
              id='main-content'
            >
              Remove as admin
            </h1>
            <p className='govuk-body'>
              They will no longer be able to sign in and manage this account.
            </p>
            <p className='govuk-body govuk-!-margin-bottom-6'>
              They will:
              <ul className='govuk-list govuk-list--bullet'>
                <li>stay in this service as a contact</li>
                <li>still get the same flood messages as before, if any</li>
              </ul>
            </p>

            <Button
              text='Remove as admin'
              className='govuk-button govuk-button--warning'
              onClick={handleSubmit}
            />
            <Link
              onClick={() => {
                navigate(-1)
              }}
              className='govuk-body govuk-link inline-link'
              style={{ cursor: 'pointer' }}
            >
              Cancel
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
