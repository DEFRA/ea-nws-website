import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import FloodWarningKey from '../../../common/components/custom/FloodWarningKey'
import LoadingSpinner from '../../../common/components/custom/LoadingSpinner'
import Map from '../../../common/components/custom/Map'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import InsetText from '../../../common/components/gov-uk/InsetText'
import Radio from '../../../common/components/gov-uk/Radio'
import {
  setAdditionalAlerts,
  setFloodAlertCount,
  setNearbyTargetAreasFlow,
  setSelectedFloodAlertArea,
  setSelectedFloodWarningArea,
  setSevereFloodWarningCount,
  setShowOnlySelectedFloodArea
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { csvToJson } from '../../../common/services/CsvToJson'

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
  const [floodHistoryData, setFloodHistoryData] = useState(null)

  useEffect(() => {
    dispatch(setSelectedFloodAlertArea(null))
    dispatch(setSelectedFloodWarningArea(null))
    dispatch(setShowOnlySelectedFloodArea(false))
    dispatch(setNearbyTargetAreasFlow(false))
    setError(null)
  }, [type])

  useEffect(() => {
    async function getHistoryUrl () {
      const { data } = await backendCall(
        'data',
        'api/locations/download_citizen_flood_history'
      )

      fetch(data)
        .then((response) => response.text())
        .then((data) => {
          setFloodHistoryData(csvToJson(data))
        })
        .catch((e) =>
          console.error('Could not fetch Historic Flood Warning file', e)
        )
    }
    getHistoryUrl()
  }, [])

  const setHistoricalAlertNumber = (AlertArea) => {
    const oneYearAgo = moment().subtract(1, 'years')

    const areaAlert = floodHistoryData.filter(
      (alert) =>
        alert.CODE === AlertArea &&
        moment(alert.DATE, 'DD/MM/YYYY') > oneYearAgo
    )
    dispatch(setFloodAlertCount(areaAlert.length))
  }

  const setHistoricalWarningNumber = (WarningArea) => {
    const oneYearAgo = moment().subtract(1, 'years')

    const areaWarning = floodHistoryData.filter(
      (alert) =>
        alert.CODE === WarningArea &&
        moment(alert.DATE, 'DD/MM/YYYY') > oneYearAgo
    )
    dispatch(setSevereFloodWarningCount(areaWarning.length))
  }

  const handleConfirm = () => {
    if (selectedFloodWarningArea || selectedFloodAlertArea) {
      if (type === 'severe') {
        dispatch(setAdditionalAlerts(true))
        setHistoricalWarningNumber(
          selectedFloodWarningArea.properties.FWS_TACODE
        )
      } else if (type === 'alert') {
        dispatch(setAdditionalAlerts(false))
        setHistoricalAlertNumber(selectedFloodAlertArea.properties.FWS_TACODE)
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

  return (
    <>
      {showMobileMap
        ? (
          <>
            <div className='govuk-body'>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className='back-map-button'
                size='xl'
                onClick={() => setShowMobileMap(false)}
              />
              <Map types={[type]} mobileView interactive />
              {selectedFloodWarningArea || selectedFloodAlertArea
                ? (
                  <div className='govuk-body map-confirm-location-box-mobile-view'>
                    <p>
                      {selectedFloodWarningArea?.properties.TA_Name ||
                    selectedFloodAlertArea?.properties.TA_Name}
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
            </div>
          </>
          )
        : (
          <>
            <BackLink onClick={() => navigate(-1)} />
            <main className='govuk-main-wrapper govuk-!-padding-top-4'>
              <div className='govuk-grid-row govuk-body'>
                <div className='govuk-grid-column-two-thirds'>
                  {error && <ErrorSummary errorList={[error]} />}
                  <h1 className='govuk-heading-l govuk-!-margin-top-6'>
                    You can get{' '}
                    {type === 'severe'
                      ? 'severe flood warnings and '
                      : 'early flood alerts '}
                    {type === 'severe' ? 'flood warnings' : ''} near this location{' '}
                    {type === 'severe' ? '' : 'about possible flooding'}
                  </h1>
                  <InsetText text={selectedLocation.address} />
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
                                label={`${index + 1}. ${area.properties.TA_Name}`}
                                name='floodAreas'
                                onChange={() => setFloodArea(area)}
                                checked={
                            (selectedFloodWarningArea &&
                              selectedFloodWarningArea.id === area.id) ||
                            (selectedFloodAlertArea &&
                              selectedFloodAlertArea.id === area.id)
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
                      text='Skip to flood alert areas nearby'
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
                  <Map types={[type]} setFloodAreas={setFloodAreas} interactive />
                  <FloodWarningKey type={type} />
                </div>
              </div>
            </main>
          </>
          )}
    </>
  )
}
