import React from 'react'
import { Helmet } from 'react-helmet'

export default function ErrorPage () {
  return (
    <>
      <Helmet>
        <title>There is a problem - Get flood warnings - GOV.UK</title>
      </Helmet>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-body govuk-grid-column'>
            <h1 className='govuk-heading-l'>
              Sorry, there is a problem with the service
            </h1>
            <p>Try again later.</p>

            <p className='govuk-!-padding-top-6'>
              <b>Contact us, if you need help</b>
              <br />
              <>
                <ul class='govuk-list'>
                  <li>Telephone: 0345 988 188</li>
                  <li>Textphone: 0345 602 6340</li>
                  <li>Open 24 hours a day, 7 days a week</li>
                </ul>
              </>{' '}
            </p>
            <p>
              Email:{' '}
              <a
                class='govuk-link'
                href='mailto:getfloodwarnings@environment-agency.gov.uk'
              >
                getfloodwarnings@environment-agency.gov.uk
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
