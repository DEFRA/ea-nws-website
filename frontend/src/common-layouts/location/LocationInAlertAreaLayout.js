import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FloodWarningKey from '../../custom-components/FloodWarningKey'
import Map from '../../custom-components/Map'
import Button from '../../gov-uk-components/Button'
import CheckBox from '../../gov-uk-components/CheckBox'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function LocationInAlertAreaLayout({ continueToNextPage }) {
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const additionalAlerts = useSelector(
    (state) => state.session.additionalAlerts
  )

  const handleSubmit = () => {
    // we need to add this to the profile
    continueToNextPage()
  }

  return (
    <>
      <div className="page-container">
        <Header />
        <div className="govuk-width-container body-container">
          <PhaseBanner />
          <div className="govuk-body">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                <Link onClick={() => navigate(-1)} className="govuk-back-link">
                  Back
                </Link>
                <h1 className="govuk-heading-l govuk-!-margin-top-6">
                  {additionalAlerts
                    ? 'You can also get flood alerts (optional)'
                    : 'You can get flood alerts for this location'}
                </h1>
                <InsetText text={selectedLocation.address} />
              </div>
              <div className="govuk-grid-column-three-quarters">
                <Map types={['alert']} />
                <FloodWarningKey severe="alert" />
              </div>
              <div className="govuk-grid-column-two-thirds">
                <p className="govuk-!-margin-top-6">
                  These are early alerts of possible flooding to help you be
                  prepared.
                </p>
                <p>The following may be at risk:</p>
                <ul className="govuk-list govuk-list--bullet">
                  <li>fields, recreational land and car parks</li>
                  <li>minor roads</li>
                  <li>farmland</li>
                  <li>coastal areas affected by spray or waves overtopping</li>
                </ul>
                <p>We usually send these:</p>
                <ul className="govuk-list govuk-list--bullet">
                  <li>2 to 12 hours before flooding</li>
                  <li>during waking hours when possible</li>
                </ul>
                {additionalAlerts && (
                  <>
                    <CheckBox
                      onChange={() => setIsChecked(!isChecked)}
                      checked={isChecked}
                      label="Yes, I want these"
                    />
                  </>
                )}
                <Button
                  text={
                    additionalAlerts
                      ? 'Continue'
                      : 'Confirm you want this location'
                  }
                  className="govuk-button govuk-!-margin-top-5"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
