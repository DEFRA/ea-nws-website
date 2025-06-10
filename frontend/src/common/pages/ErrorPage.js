import React from 'react'
import { Link } from 'react-router-dom'
import ContactDetails from '../layouts/footer-link-layouts/ContactDetails'

export default function ErrorPage () {
  return (
    <>
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
              Email:{' '}
              <a
                class='govuk-link'
                href='mailto:enquiries@environment-agency.gov.uk'
              >
                enquiries@environment-agency.gov.uk
              </a>
              <br />
              Monday to Friday, 8am to 6pm
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
