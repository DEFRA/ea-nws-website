import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'

export default function ResendInvitePage() {
  const navigate = useNavigate()
  const location = useLocation()

  const authToken = useSelector((state) => state.session.token)
  const orgId = useSelector((state) => state.session.orgId)

  const pendingAdmin = location.state?.pendingAdmin
  const pendingAdminEmail = pendingAdmin?.emails[0]
  const pendingAdminName =
    pendingAdmin?.firstname + ' ' + pendingAdmin?.lastname

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        authToken,
        orgId,
        contactId: pendingAdmin.id,
        role: 'ADMIN'
      }
      const { errorMessage } = await backendCall(
        dataToSend,
        'api/organization/promote_contact',
        navigate
      )

      if (errorMessage) {
        throw new Error(errorMessage)
      }

      navigate(orgManageContactsUrls.admin.pendingInvites, {
        state: {
          successMessage: [
            `Email invitation sent to ${pendingAdminEmail}`,
            `${pendingAdminName} will be a pending admin until they accept the invitation and confirm their email address. Invitation valid for 72 hours.`
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
        <title>Resend Admin Invite - Next Warning Service GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-body'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l govuk-!-margin-top-3'>
              Do you want to resend an admin invite to {pendingAdminName}?
            </h1>
            <p className='govuk-body govuk-!-margin-bottom-8'>
              They'll get another 72 hours to accept the invitation and join as
              admin.
            </p>

            <Button
              text='Yes, resend invitation'
              className='govuk-button'
              onClick={handleSubmit}
            />
            <Link
              onClick={() => navigate(-1)}
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
