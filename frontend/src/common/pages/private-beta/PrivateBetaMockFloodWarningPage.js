import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import floodWarningIcon from '../../assets/images/flood_warning.svg'
import BackLink from '../../components/custom/BackLink'
import ContactDetails from '../../layouts/footer-link-layouts/ContactDetails'

export default function PrivateBetaMockFloodWarningPage () {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Flood warning for areas near the eastern river - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div
            className='govuk-body govuk-grid-column-three-quarters govuk-!-margin-left-3 private-beta-mock-banner'
            style={{ backgroundColor: '#FCEAEC', borderColor: '#DB091C' }}
          >
            <img
              src={floodWarningIcon}
              alt='Warning Icon'
              style={{ width: '100px', height: '75px' }}
            />
            <span className='govuk-!-font-weight-bold'>
              Flooding is expected -{' '}
            </span>
            <a
              href='https://www.gov.uk/guidance/flood-alerts-and-warnings-what-they-are-and-what-to-do#flood-warning'
              className='govuk-link'
            >
              act now
            </a>
          </div>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>
                Flood warning for areas near the Eastern River near Highford and
                surrounding areas
              </h1>
              <p>
                Heavy rain is currently falling in the Highford catchment and
                will continue for the rest of today. This will cause the Eastern
                River to continue to rise through today and into tomorrow. Low
                lying areas near to the Eastern river are already flooded. We
                expect Highford Aquadrome to be affected at some point during
                the night, and are issuing this warning proactively to give
                sufficient notice to take action. Further heavy rain is forecast
                for tomorrow afternoon and therefore river levels are expected
                to continue to increase. Remain safe and be aware of your local
                surroundings. Please avoid contact with flood water. Our staff
                are out in the area to check the flood defences, clear
                blockages, and assist the emergency services and council. We
                will be closely monitoring the situation and this message will
                be updated online and on Floodline by 16:00 tomorrow, or before
                if the situation changes.
              </p>
              <p>
                Flood warning area, Eastern River near Highford and surrounding
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
