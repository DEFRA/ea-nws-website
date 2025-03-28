import React from 'react'
import { useNavigate } from 'react-router'
import BackLink from '../../../../common/components/custom/BackLink'

export default function PendingAdminsPage() {
  const navigate = useNavigate()
  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-body'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l govuk-!-margin-top-3'>
              Pending admins who still need to accept their invitation
            </h1>
          </div>
        </div>
      </main>
    </>
  )
}
