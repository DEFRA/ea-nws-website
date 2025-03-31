import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'

export default function ResendInvitePage () {
  const navigate = useNavigate()
  const location = useLocation()

  const pendingAdmin = location.state?.pendingAdmin
  const pendingAdminEmail = pendingAdmin.emails[0]
  const pendingAdminName =
    pendingAdmin?.firstname + ' ' + pendingAdmin?.lastname

  const adminName =
    useSelector((state) => state.session.profile.firstname) +
    ' ' +
    useSelector((state) => state.session.profile.lastname)
  const adminEmail = useSelector((state) => state.session.profile.emails[0])

  const handleSubmit = async () => {
    try {
      const emailParams = {
        email: pendingAdminEmail,
        name: pendingAdminName,
        adminName,
        adminEmail
      }

      await backendCall(emailParams, 'api/notify/admin_invited', navigate)

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
