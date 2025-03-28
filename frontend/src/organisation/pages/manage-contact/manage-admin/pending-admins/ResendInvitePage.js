import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'

export default function ResendInvitePage() {
  const navigate = useNavigate()
  const location = useLocation()

  const pendingAdmin = location.state?.pendingAdmin

  console.log(pendingAdmin)

  const handleSubmit = () => {}

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-body'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l govuk-!-margin-top-3'>
              Do you want to resend an admin invite to {pendingAdmin.firstname}
              {pendingAdmin?.lastname?.length > 0
                ? ' ' + pendingAdmin?.lastname
                : ''}
              ?
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
