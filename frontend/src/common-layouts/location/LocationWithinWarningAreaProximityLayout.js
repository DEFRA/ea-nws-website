import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useMemo, useState } from 'react'
import { isMobile } from 'react-device-detect'
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
  setNearbyTargetAreasFlow,
  setSelectedFloodAlertArea,
  setSelectedFloodWarningArea,
  setShowOnlySelectedFloodArea
} from '../../redux/userSlice'

export default function LocationWithinWarningAreaProximityLayout ({
  continueToSelectedFloodWarningsPage,
  continueToNearbyFloodAlertsPage,
  continueToSearchResultsPage
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { type } = useParams()
  const [floodAreas, setFloodAreas] = useState(null)
  const [error, setError] = useState(null)
  const [showMobileMap, setShowMobileMap] = useState(false)

  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const selectedFloodWarningArea = useSelector(
    (state) => state.session.selectedFloodWarningArea
  )
  const selectedFloodAlertArea = useSelector(
    (state) => state.session.selectedFloodAlertArea
  )

  useEffect(() => {
    dispatch(setSelectedFloodAlertArea(null))
    dispatch(setSelectedFloodWarningArea(null))
    dispatch(setShowOnlySelectedFloodArea(false))
    dispatch(setNearbyTargetAreasFlow(false))
    setError(null)
  }, [type])


  const handleConfirm = () => {
    if (selectedFloodWarningArea || selectedFloodAlertArea) {
      if (type === 'severe') {
        dispatch(setAdditionalAlerts(true))
      } else if (type === 'alert') {
        dispatch(setAdditionalAlerts(false))
      }
      dispatch(setShowOnlySelectedFloodArea(true))
      dispatch(setNearbyTargetAreasFlow(true))
      continueToSelectedFloodWarningsPage(type)
    } else {
      setError('Select a nearby area')
    }
  }

  const setFloodArea = async (area) => {
    if (type === 'severe') {
      dispatch(setSelectedFloodWarningArea(area))
    } else if (type === 'alert') {
      dispatch(setSelectedFloodAlertArea(area))
    }
  }

  const map = useMemo(() => (<Map types={[type]} mobileView interactive />), [type])

  return (
    <>
      {showMobileMap
        ? (
          <>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className='back-map-button'
              size='xl'
              onClick={() => setShowMobileMap(false)}
            />
            {map}
            {selectedFloodWarningArea || selectedFloodAlertArea
              ? (
                <div className='govuk-body map-confirm-location-box-mobile-view'>
                  <p>
                    {selectedFloodWarningArea?.properties.ta_name ||
                  selectedFloodAlertArea?.properties.ta_name}
                  </p>
                  <Button
                    text='Confirm this location'
                    className='govuk-button custom-width-button govuk-!-margin-bottom-2'
                    onClick={handleConfirm}
                  />
                </div>
                )
              : (
                <div className='flood-warning-key-mobile-view'>
                  <FloodWarningKey type={type} mobileView />
                </div>
                )}
          </>
          )
        : (
          <div className='page-container'>
            <Header />
            <div className='govuk-width-container body-container'>
              <PhaseBanner />
              <div className='govuk-body'>
                <div className='govuk-grid-row'>
                  <div className='govuk-grid-column-two-thirds'>
                    <Link
                      onClick={() => navigate(-1)}
                      className='govuk-back-link'
                    >
                      Back
                    </Link>
                    {error && <ErrorSummary errorList={[error]} />}
                    <h1 className='govuk-heading-l govuk-!-margin-top-6'>
                      You can get flood messages near this location
                    </h1>
                    <InsetText text={selectedLocation.name} />
                    <p>
                      Flood message areas nearby are highlighted in{' '}
                      {type === 'severe' ? 'red' : 'orange'} on the map.
                    </p>
                    <p>
                      If you choose one of these, you'll get early alerts about
                      possible flooding.
                    </p>
                  </div>
                </div>
                <div className='govuk-grid-row'>
                  <div className='govuk-grid-column-one-third'>
                    <div
                      className={
                      error
                        ? 'govuk-form-group govuk-form-group--error'
                        : 'govuk-form-group'
                    }
                    >
                      <fieldset className='govuk-fieldset'>
                        <h3 className='govuk-heading-s'>Select a nearby area</h3>
                        {error && <p className='govuk-error-message'>{error}</p>}
                        {floodAreas
                          ? (
                              floodAreas.map((area, index) => (
                                <Radio
                                  key={index}
                                  small
                                  label={`${index + 1}. ${area.properties.ta_name}`}
                                  name='floodAreas'
                                  onChange={() => setFloodArea(area)}
                                  checked={
                              (selectedFloodWarningArea &&
                                selectedFloodWarningArea.properties.gml_id ===
                                  area.properties.gml_id) ||
                              (selectedFloodAlertArea &&
                                selectedFloodAlertArea.properties.gml_id ===
                                  area.properties.gml_id)
                            }
                                />
                              ))
                            )
                          : (
                            <LoadingSpinner />
                            )}
                      </fieldset>
                    </div>
                    <div className='button-link-container'>
                      <Button
                        text='Confirm'
                        className={`govuk-button govuk-!-margin-top-5 ${
                        isMobile ? 'custom-width-button' : ''
                      }`}
                        onClick={handleConfirm}
                      />
                      {isMobile && (
                        <Link
                          onClick={(e) => {
                            e.preventDefault()
                            setShowMobileMap(true)
                          }}
                        >
                          View and select on map
                        </Link>
                      )}
                    </div>
                    {type === 'severe' && (
                      <Button
                        text='Skip to other areas nearby'
                        className={`govuk-button govuk-button--secondary ${
                        isMobile ? 'custom-width-button' : ''
                      }`}
                        onClick={continueToNearbyFloodAlertsPage}
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
                  <div
                    className={
                    isMobile
                      ? 'govuk-visually-hidden'
                      : 'govuk-grid-column-two-thirds'
                  }
                  >
                    <Map
                      types={[type]}
                      setFloodAreas={setFloodAreas}
                      interactive
                    />
                    <FloodWarningKey type={type} />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
          )}
    </>
  )
}
