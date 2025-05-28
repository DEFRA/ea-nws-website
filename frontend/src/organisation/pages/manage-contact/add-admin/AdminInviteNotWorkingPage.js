import React from 'react'
import { Helmet } from 'react-helmet'

export default function AdminInviteNotWorkingPage () {
  return (
    <>
      <Helmet>
        <title>Your Invitation Is No Longer Working - GOV.UK</title>
      </Helmet>
      <main className='govuk-main-wrapper'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>
              Your invitation is no longer working
            </h1>
            <p className='govuk-body'>
              Contact the person in your organisation who invited you if you
              either:
            </p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>need a new invitation link</li>
              <li>have questions about this</li>
            </ul>
            <p className='govuk-body'>
              This person's contact details are in your email invitation.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
