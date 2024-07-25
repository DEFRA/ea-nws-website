import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FloodWarningKey from '../../custom-components/FloodWarningKey'
import LoadingSpinner from '../../custom-components/LoadingSpinner'
import Map from '../../custom-components/Map'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import Radio from '../../gov-uk-components/Radio'
import {
  setAdditionalAlerts,
  setSelectedFloodArea,
  setShowOnlySelectedFloodArea
} from '../../redux/userSlice'

export default function LocationWithinWarningAreaProximityLayout({
  continueToSelectedFloodWarningsPage,
  continueToNearbyFloodAlertsPage,
  continueToSearchResultsPage
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { type } = useParams()
  const [floodAreas, setFloodAreas] = useState(null)
  const [error, setError] = useState(null)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const selectedFloodArea = useSelector(
    (state) => state.session.selectedFloodArea
  )

  // reset to show all flood areas within proximity and remove selected location
  useEffect(() => {
    dispatch(setSelectedFloodArea(null))
    dispatch(setShowOnlySelectedFloodArea(false))
    setError(null)
  }, [type])

  const handleConfirm = () => {
    if (selectedFloodArea) {
      //only show the selected flood area on the map
      dispatch(setShowOnlySelectedFloodArea(true))
      //user only has option to select one flood area at a time

      dispatch(setAdditionalAlerts(false))
      continueToSelectedFloodWarningsPage(type)
    } else {
      setError('Select a nearby area')
    }
  }

  const setFloodArea = (area) => {
    dispatch(setSelectedFloodArea(area))
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <div className='govuk-body'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <Link onClick={() => navigate(-1)} className='govuk-back-link'>
                  Back
                </Link>
                {error && <ErrorSummary errorList={[error]} />}
                <h1 className='govuk-heading-l govuk-!-margin-top-6'>
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
            <div class='govuk-grid-row'>
              <div class='govuk-grid-column-one-third'>
                <div
                  className={
                    error
                      ? 'govuk-form-group govuk-form-group--error'
                      : 'govuk-form-group'
                  }
                >
                  <fieldset className='govuk-fieldset'>
                    <h3 class='govuk-heading-s'>Select a nearby area</h3>
                    {error && <p className='govuk-error-message'>{error}</p>}
                    {floodAreas ? (
                      floodAreas.map((area, index) => (
                        <Radio
                          key={index}
                          small={true}
                          label={index + 1 + '. ' + area.properties.ta_name}
                          name={'floodAreas'}
                          onChange={() => setFloodArea(area)}
                          checked={selectedFloodArea === area}
                        />
                      ))
                    ) : (
                      <LoadingSpinner />
                    )}
                  </fieldset>
                </div>
                <Button
                  text={'Confirm'}
                  className={'govuk-button govuk-!-margin-top-5'}
                  onClick={() => handleConfirm()}
                />
                {type === 'severe' && (
                  <Button
                    text={'Skip to other areas nearby'}
                    className={'govuk-button govuk-button--secondary'}
                    onClick={() => continueToNearbyFloodAlertsPage()}
                  />
                )}
                <br />
                <Link
                  onClick={(e) => {
                    e.preventDefault()
                    continueToSearchResultsPage()
                  }}
                >
                  Choose different location
                </Link>
              </div>
              <div class='govuk-grid-column-two-thirds'>
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
