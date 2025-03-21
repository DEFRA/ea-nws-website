import React from 'react'
import { useNavigate } from 'react-router'
import Button from '../../../../common/components/gov-uk/Button'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AdminInvitePage () {
  const navigate = useNavigate()

  return (
    <>
      <main className='govuk-main-wrapper'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>
              You've been invited to join as an admin for your organisation
            </h1>
            <div className='govuk-!-margin-top-8'>
              <Button
                text='Accept invitation'
                className='govuk-button'
                onClick={() => navigate(orgManageContactsUrls.admin.joined)}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
