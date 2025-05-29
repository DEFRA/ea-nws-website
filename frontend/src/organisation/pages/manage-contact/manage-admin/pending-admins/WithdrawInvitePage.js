import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'

export default function WithdrawInvitePage () {
  const navigate = useNavigate()
  const location = useLocation()

  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const pendingAdmin = location.state?.pendingAdmin
  const pendingAdminName =
    pendingAdmin?.firstname + ' ' + pendingAdmin?.lastname

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const dataToSend = { authToken, orgId, contactId: pendingAdmin.id }
      const { errorMessage } = await backendCall(
        dataToSend,
        'api/organization/demote_contact',
        navigate
      )

      if (errorMessage) {
        throw new Error(errorMessage)
      }

      navigate(orgManageContactsUrls.admin.pendingInvites, {
        state: {
          successMessage: [
            `Invitation withdrawn for ${pendingAdminName}`,
            "They'll no longer join as admin unless you promote them again. This will not affect any flood messages they get."
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
        <title>Do you want to withdraw the admin invitation for {pendingAdminName}? - Manage users - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-body'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l govuk-!-margin-top-3'>
              Do you want to withdraw the admin invitation for{' '}
              {pendingAdminName}?
            </h1>
            <p className='govuk-body'>
              They will no longer be able to join as admin.
            </p>

            <p className='govuk-body'>They will:</p>

            <ul className='govuk-list govuk-list--bullet govuk-!-margin-bottom-8'>
              <li>stay in this service as a contact</li>
              <li>still get the same flood messages as before, if any</li>
            </ul>

            <Button
              text='Yes, withdraw invitation'
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
