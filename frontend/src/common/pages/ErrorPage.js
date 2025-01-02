import React from 'react'
import { Link } from 'react-router-dom'

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
              <b>Contact us, if you need help</b><br />
              Telephone: 0345 988 1188<br />
              Textphone: 0345 602 6340<br />
              24 hour service, 7days a week
            </p>

            <p>
              Email: {' '}
              <Link>
                getfloodwarnings@environment-agency.gov.uk
              </Link>
              <br />
              Monday to Friday, 8am to 6pm
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
