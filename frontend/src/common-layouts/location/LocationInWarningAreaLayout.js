import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FloodWarningKey from '../../custom-components/FloodWarningKey'
import Button from '../../gov-uk-components/Button'
import CheckBox from '../../gov-uk-components/CheckBox'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function LocationInWarningAreaLayout({
  submit,
  additionalAlerts,
  locationData
}) {
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false)
  //locationData must be an object

  const handleSubmit = () => {
    //do we need any logic here?
    submit()
  }

  const containerStyle = {
    width: '800px',
    height: '300px'
  }

  const center = {
    lat: 40.7128,
    lng: -74.006
  }

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <PhaseBanner />
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-body">
              <Link onClick={() => navigate(-1)} className="govuk-back-link">
                Back
              </Link>
              <h1 className="govuk-heading-l govuk-!-margin-top-6">
                {additionalAlerts
                  ? 'you can also get flood alerts (optional)'
                  : 'You can get flood alerts for this location'}
              </h1>
              <InsetText
                text={'1 All saints house, The Causeway'}
                //pass address here
              />
              <div>
                <LoadScript googleMapsApiKey="AIzaSyB7eZQFB_57ixg_5yhS-np5RC2vrBnw25s">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                </LoadScript>
              </div>
              <FloodWarningKey severe={false} />
              <p className="govuk-!-margin-top-6">
                These are early alerts of possible flooding to help you be
                prepared.
              </p>
              <p>The following may be at risk:</p>
              <ul class="govuk-list govuk-list--bullet">
                <li>fields, recreational land and car parks</li>
                <li>minor roads</li>
                <li>farmland</li>
                <li>coastal areas affected by spray or waves overtopping</li>
              </ul>
              <p>We usually send these:</p>
              <ul class="govuk-list govuk-list--bullet">
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
                  <br />
                </>
              )}
              <Button
                text={
                  additionalAlerts
                    ? 'Continue'
                    : 'Confirm you want this location'
                }
                className="govuk-button"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
