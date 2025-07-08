import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import Button from '../../components/gov-uk/Button'

export default function OrganisationConfirmServicePage() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>
          You've chosen the professional service - Get flood warnings
          (professional) - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body govuk-!-margin-top-6'>
              <h1
                className='govuk-heading-l govuk-!-margin-top-6'
                id='main-content'
              >
                You've chosen the professional
                <span style={{ display: 'block' }} />
                (organisation) service
              </h1>
              <p className='govuk-!-margin-top-6'>
                To continue, you must have the authority to agree to our terms
                and conditions on behalf of your organisation.
              </p>
              <p className='govuk-!-margin-top-6'>
                We'll need you to provide the following information so we can
                verify your organisation:
              </p>
              <ul className='govuk-list govuk-list--bullet govuk-!-margin-left-2'>
                <li>Organisation name and address</li>
                <li>Companies house number, if you have one</li>
                <li>Details for an administrator and an alternative contact</li>
              </ul>
              <p className='govuk-!-margin-top-6'>
                If you've already signed up for the standard service, you'll
                need to use a different email address here.
              </p>
              <div className='govuk-!-margin-top-8'>
                <Button
                  className='govuk-button'
                  text='Continue'
                  onClick={(event) => {
                    event.preventDefault()
                    navigate('/organisation/sign-up')
                  }}
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
