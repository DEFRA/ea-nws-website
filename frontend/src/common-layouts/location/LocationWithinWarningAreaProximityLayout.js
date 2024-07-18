import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FloodWarningKey from '../../custom-components/FloodWarningKey'
import Map from '../../custom-components/Map'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import Radio from '../../gov-uk-components/Radio'

export default function LocationWithinWarningAreaProximityLayout() {
  const navigate = useNavigate()
  const [selectedFloodArea, setSelectedFloodArea] = useState('')
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )

  const results = [
    {
      label:
        'a. River thames at bisham village and marlow town. 500 metres from pin',
      value: 'this will need to be the geojson data?',
      name: 'floodAreas'
    },

    {
      label:
        'b. Properties closest to the river thames from all ssaints church, bishan to little marlow. 1250 metres from pin',
      value: 'this will need to be the geojson data?',
      name: 'floodAreas'
    }
  ]

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
                  You can get flood messages near this location
                </h1>
                <InsetText text={selectedLocation.name} />
              </div>
            </div>
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-one-third">
                <h3 class="govuk-heading-s">Select a nearby target area</h3>
                {/* need to update this to loop over flood area results map */}
                {results.map((result) => (
                  <Radio
                    small={true}
                    label={result.label}
                    value={result.value}
                    name={result.name}
                    onChange={() => setSelectedFloodArea(result.label)}
                  />
                ))}
                <Button
                  text={'Confirm'}
                  className={'govuk-button govuk-!-margin-top-5'}
                />
                <Button
                  text={'Skip to other areas nearby'}
                  className={'govuk-button govuk-button--secondary'}
                />
                <br />
                <Link to={() => navigate(-1)}>Choose different location</Link>
              </div>
              <div class="govuk-grid-column-two-thirds">
                <Map types={['warning']} />
                <FloodWarningKey type="severe" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
