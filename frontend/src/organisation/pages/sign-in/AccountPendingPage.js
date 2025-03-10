import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'

export default function AccountPendingPage () {
  const navigate = useNavigate()
  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>Email address not recognised</h1>
            <p>
              You can try{' '}
              <Link to='/sign-in' className='govuk-link'>
                entering your email again.
              </Link>
            </p>
            <h2 className='govuk-heading-m'>If you do not have an account</h2>
            <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
              Personal sign up
            </h3>
            <Link to='/signup' className='govuk-link'>
              Get flood warnings by text, email or phone
            </Link>
            <h3 className='govuk-heading-s govuk-!-margin-bottom-1 govuk-!-margin-top-2'>
              Organisation sign up{' '}
            </h3>
            <Link to='/organisation/sign-up' className='govuk-link'>
              Get flood warnings for your organisation
            </Link>

            <h2 className='govuk-heading-m govuk-!-margin-top-4'>
              If you recently signed up for an organisation account
            </h2>
            <p>
              Your account may still be pending approval and you will not be
              able to sign in until it’s approved.
            </p>
            <p>
              It usually takes us 2 to 3 working days to approve an account and
              you should hear from us soon.
            </p>
            <p>
              You can <Link to='/contact'>contact us</Link>, if you need to.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
