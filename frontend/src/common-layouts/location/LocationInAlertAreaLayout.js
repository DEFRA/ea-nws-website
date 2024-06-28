import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FloodWarningKey from '../../custom-components/FloodWarningKey'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function LocationInAlertAreaLayout({ submit, locationData }) {
  const navigate = useNavigate()
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
                You can get severe flood warnings and flood warnings for this
                location
              </h1>
              <InsetText
                text={'1 All saints house, The Causeway'}
                //pass address here
              />
              <div>
                <LoadScript
                  googleMapsApiKey="AIzaSyB7eZQFB_57ixg_5yhS-np5RC2vrBnw25s" // Replace with your Google Maps API key
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                </LoadScript>
              </div>
              <FloodWarningKey severe={true} />
              <p className="govuk-!-margin-top-6">
                These warnings tell you when flooding:
              </p>
              <ul class="govuk-list govuk-list--bullet">
                <li>is expected</li>
                <li>could be a danger to life or property</li>
              </ul>
              <p>You'll need to act immediately.</p>
              <p>The following may be affected:</p>
              <ul class="govuk-list govuk-list--bullet">
                <li>life and communities</li>
                <li>homes and business</li>
                <li>roads, railway lines and infrastructure</li>
                <li>coastal areas affected by spray or waves overtopping</li>
                <li>flood plains, including caravan parks and campsites</li>
                <li>major tourist and leisure attractions</li>
              </ul>
              <p>
                Flood warnings are usually sent 30 minutes to 2 hours before
                flooding
              </p>
              <p>
                Severe flood wanrings will be sent at any time when life is at
                risk.
              </p>
              <Button
                text="Confirm you want this location"
                className="govuk-button"
                onClick={handleSubmit}
              />
              &nbsp; &nbsp;
              <Link
                onClick={() => navigate(-1)}
                className="govuk-link"
                style={{
                  display: 'inline-block',
                  padding: '8px 10px 7px'
                }}
              >
                Choose different location
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
