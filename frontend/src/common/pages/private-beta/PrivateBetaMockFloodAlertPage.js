import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import floodAlertIcon from '../../assets/images/flood_alert.svg'
import BackLink from '../../components/custom/BackLink'
import ContactDetails from '../../layouts/footer-link-layouts/ContactDetails'

export default function PrivateBetaMockFloodAlertPage () {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Flood alert for eastern river and surrounding areas - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div
            className='govuk-body govuk-grid-column-three-quarters govuk-!-margin-left-3 private-beta-mock-banner'
            style={{ backgroundColor: '#FDF1E3', borderColor: '#EB7C25' }}
          >
            <img
              src={floodAlertIcon}
              alt='Alert Icon'
              style={{ width: '100px', height: '75px' }}
            />
            <span className='govuk-!-font-weight-bold'>
              Flooding is possible -{' '}
            </span>
            <a
              href='https://www.gov.uk/guidance/flood-alerts-and-warnings-what-they-are-and-what-to-do#flood-alert'
              className='govuk-link'
            >
              be prepared
            </a>
          </div>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>
                Flood alert for Eastern River and surrounding areas
              </h1>
              <p>Property flooding is not currently expected.</p>
              <p>
                River levels are steady on the Eastern River, and flooding of
                low lying land and roads is still possible tonight, especially
                in the Green Road area of Eastern River. Tomorrow's forecast is
                for wetter windier conditions and we expect levels to rise again
                in response to the rainfall, especially tomorrow evening.
              </p>
              <p>
                We are monitoring the situation. Avoid using low lying footpaths
                near local watercourses. Go to the 'River and Sea levels in
                England' webpage for current river levels.
              </p>
              <p>
                This message will be updated tomorrow morning, or as the
                situation changes.
              </p>
              <p>Flood alert area, Eastern River and surrounding areas</p>
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
