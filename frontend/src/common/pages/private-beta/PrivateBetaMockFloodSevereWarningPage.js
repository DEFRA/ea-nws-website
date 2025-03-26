import React from 'react'
import { useNavigate } from 'react-router-dom'
import floodSevereWarningIcon from '../../assets/images/severe_flood_warning.svg'
import BackLink from '../../components/custom/BackLink'
import ContactDetails from '../../layouts/footer-link-layouts/ContactDetails'

export default function PrivateBetaMockFloodSevereWarningPage() {
  const navigate = useNavigate()

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div
            className='govuk-body govuk-grid-column-three-quarters govuk-!-margin-left-3 private-beta-mock-banner'
            style={{ backgroundColor: '#FFD7DC', borderColor: '#DB091C' }}
          >
            <img
              src={floodSevereWarningIcon}
              alt='Severe Warning Icon'
              style={{ width: '100px', height: '75px' }}
            />
            <span className='govuk-!-font-weight-bold'>Danger to life - </span>
            <a
              href='https://www.gov.uk/guidance/flood-alerts-and-warnings-what-they-are-and-what-to-do#severe-flood-warning'
              className='govuk-link'
            >
              act now
            </a>
          </div>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>
                Severe flood warning for Eastern River near Highford and
                surrounding areas
              </h1>
              <p>
                This is a severe flood warning for the Highford Aquadrome and
                nearby business parks. This warning has been issued due to deep
                and fast flowing water and a rapid onset of flooding. This means
                there is danger to life and you must act now. Call 999 if in
                immediate danger, follow advice from emergency services, keep
                yourself and your family safe. Severe flooding is expected
                imminently. Water levels are continuing to rise on the Eastern
                River at Highford Aquadrome and nearby business parks, the water
                may be deep and fast flowing. Please evacuate the area.
              </p>
              <p>
                Severe flood warning area, Eastern River near Highford and
                surrounding areas
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
