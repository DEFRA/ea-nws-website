import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import ContactDetails from '../../layouts/footer-link-layouts/ContactDetails'

export default function PrivateBetaMockFloodWarningRemovedAlertPage () {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Removed flood warning alert - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div
            className='govuk-body govuk-grid-column-three-quarters govuk-!-margin-left-3 private-beta-mock-banner'
            style={{
              backgroundColor: '#FDF1E3',
              borderColor: '#EB7C25',
              height: '75px',
              lineHeight: '75px'
            }}
          >
            The flood warning was removed, but there's still a{' '}
            <Link
              onClick={navigate('/private-beta/flood-alert')}
              className='govuk-link'
            >
              flood alert in the wider area
            </Link>
          </div>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>
                Eastern River near Highford and surrounding areas warning area
              </h1>
              <p>
                The Eastern River is higher than normal, but continues to fall
                following yesterday's rain. Minor flooding will continue to
                affect fields and rural roads in the area. These minor flood
                impacts are described in a Flood Alert which remains in force.
                Only showers are forecast for tomorrow. Rivers should continue
                to fall, and return nearer to a normal level in the next 2 days.
                There is uncertainty in the weather forecast for the rest of the
                week. Further rain (10-20mm) is also possible at the weekend..
                If rain occurs this week, river levels will rise and minor flood
                impacts could return from Wednesday evening. We continue to
                monitor the levels and forecast. We will reissue this Flood
                Warning if new instances of property flooding are expected.
              </p>
              <p>
                Flood warning area: Eastern River near Highford and surrounding
                areas
              </p>
              <h2 className='govuk-heading-m'>Contact Floodline for advice</h2>
              <p>
                <ContactDetails />
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
