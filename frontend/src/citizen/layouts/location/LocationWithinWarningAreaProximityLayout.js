import React, { useEffect, useState } from 'react'
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
  setNearbyTargetAreasFlow,
  setSelectedFloodAlertArea,
  setSelectedFloodWarningArea,
  setShowOnlySelectedFloodArea
} from '../../../common/redux/userSlice'

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
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const selectedFloodWarningArea = useSelector(
    (state) => state.session.selectedFloodWarningArea
  )
  const selectedFloodAlertArea = useSelector(
    (state) => state.session.selectedFloodAlertArea
  )

  // reset all target area variables to default values on page load
  useEffect(() => {
    dispatch(setSelectedFloodAlertArea(null))
    dispatch(setSelectedFloodWarningArea(null))
    dispatch(setShowOnlySelectedFloodArea(false))
    dispatch(setNearbyTargetAreasFlow(false))
    setError(null)
  }, [type])

  const handleConfirm = () => {
    if (selectedFloodWarningArea || selectedFloodAlertArea) {
      // if user selected warning area, we need to show them optional associated alert area
      switch (type) {
        case 'severe':
          dispatch(setAdditionalAlerts(true))
          break
        case 'alert':
          dispatch(setAdditionalAlerts(false))
          break
        default:
          break
      }

      // only show the selected flood area on the map on next page
      dispatch(setShowOnlySelectedFloodArea(true))
      // need to let the severe or alert pages know that nearby flood areas flow is taking place
      // so that correct data is added
      dispatch(setNearbyTargetAreasFlow(true))
      continueToSelectedFloodWarningsPage(type)
    } else {
      setError('Select a nearby area')
    }
  }

  const setFloodArea = async (area) => {
    switch (type) {
      case 'severe':
        dispatch(setSelectedFloodWarningArea(area))
        break
      case 'alert':
        dispatch(setSelectedFloodAlertArea(area))
        break
      default:
        break
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
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
                {floodAreas
                  ? (
                      floodAreas.map((area, index) => (
                        <Radio
                          key={index}
                          small
                          label={index + 1 + '. ' + area.properties.ta_name}
                          name='floodAreas'
                          onChange={() => setFloodArea(area)}
                          checked={
                            (selectedFloodWarningArea ||
                              selectedFloodAlertArea) === area
                          }
                        />
                      ))
                    )
                  : (
                    <LoadingSpinner />
                    )}
              </fieldset>
            </div>
            <Button
              text='Confirm'
              className='govuk-button govuk-!-margin-top-5'
              onClick={() => handleConfirm()}
            />
            {type === 'severe' && (
              <Button
                text='Skip to other areas nearby'
                className='govuk-button govuk-button--secondary'
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
            />
            <FloodWarningKey type={type} />
          </div>
        </div>
      </main>
    </>
  )
}
