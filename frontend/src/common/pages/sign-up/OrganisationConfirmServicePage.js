import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import Button from '../../components/gov-uk/Button'

export default function OrganisationConfirmServicePage () {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>You've chosen the professional service - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body govuk-!-margin-top-6'>
              <h1 className='govuk-heading-m govuk-!-margin-top-6'>
                You've chosen the professional<br />
                (organisation) service
              </h1>
              <p className='govuk-!-margin-top-6'>
                To continue you'll need your:
              </p>
              <ul className='govuk-list govuk-list--bullet govuk-!-margin-left-2'>
                <li>organisation name and address</li>
                <li>Companies house number, if you have one</li>
                <li>details for an administrator and an alternative contact</li>
              </ul>
              <div className='govuk-!-margin-top-8'>
                <Button
                  className='govuk-button'
                  text='Continue'
                  onClick={(event) => { event.preventDefault(); navigate('/organisation/sign-up') }}
                />
                &nbsp; &nbsp;
                <Link
                  to='/signup/organisation-service'
                  className='govuk-link inline-link'
                >
                  Back to select service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
