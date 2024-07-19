import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FloodWarningKey from '../../custom-components/FloodWarningKey'
import LoadingSpinner from '../../custom-components/LoadingSpinner'
import Map from '../../custom-components/Map'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import Radio from '../../gov-uk-components/Radio'

export default function LocationWithinWarningAreaProximityLayout() {
  const navigate = useNavigate()
  const { type } = useParams()
  const [floodAreas, setFloodAreas] = useState(null)
  const [selectedFloodArea, setSelectedFloodArea] = useState(null)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )

  useEffect(() => {
    setSelectedFloodArea(null)
  }, [type])

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
                <p>
                  Flood message areas nearby are highlight in{' '}
                  {type === 'severe' ? 'red' : 'orange'} on the map.
                </p>
                <p>
                  If you choose one of these, you'll get early alerts about
                  possible flooding.
                </p>
              </div>
            </div>
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-one-third">
                <h3 class="govuk-heading-s">Select a nearby target area</h3>
                {floodAreas ? (
                  floodAreas.map((area, index) => (
                    <Radio
                      key={index}
                      small={true}
                      label={index + 1 + '. ' + area.properties.ta_name}
                      name={'floodAreas'}
                      onChange={() => setSelectedFloodArea(area)}
                      checked={selectedFloodArea === area}
                    />
                  ))
                ) : (
                  <LoadingSpinner />
                )}
                <Button
                  text={'Confirm'}
                  className={'govuk-button govuk-!-margin-top-5'}
                  onClick={() => navigate('/')}
                />
                {type === 'severe' && (
                  <Button
                    text={'Skip to other areas nearby'}
                    className={'govuk-button govuk-button--secondary'}
                    onClick={() => {
                      navigate(
                        `/signup/register-location/location-in-proximity-area/${'alert'}`
                      )
                    }}
                  />
                )}
                <br />
                <Link to={() => navigate(-1)}>Choose different location</Link>
              </div>
              <div class="govuk-grid-column-two-thirds">
                <Map
                  types={[type]}
                  setFloodAreas={(areas) => setFloodAreas(areas)}
                  selectedFloodArea={selectedFloodArea}
                />
                <FloodWarningKey type={type} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
