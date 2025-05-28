import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import ContactDetails from '../layouts/footer-link-layouts/ContactDetails'

export default function ErrorPage () {
  return (
    <>
      <Helmet>
        <title>There is a problem - GOV.UK</title>
      </Helmet>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-body govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              Sorry, there is a problem with the service
            </h1>
            <p>Try again later.</p>

            <p className='govuk-!-padding-top-6'>
              <b>Contact us, if you need help</b>
              <br />
              <ContactDetails />
            </p>
            <p>
              Email: <Link>getfloodwarnings@environment-agency.gov.uk</Link>
              <br />
              Monday to Friday, 8am to 6pm
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
