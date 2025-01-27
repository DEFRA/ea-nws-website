import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import store from '../../../../../../common/redux/store'
import {
  setCurrentLocation,
  setCurrentLocationCoordinates,
  setCurrentLocationEasting,
  setCurrentLocationNorthing
} from '../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../common/services/BackendService'
import { convertCoordinatesToEspg27700 } from '../../../../../../common/services/CoordinatesFormatConverter'
import { locationInEngland } from '../../../../../../common/services/validations/LocationInEngland'
import Map from '../../../../../components/custom/Map'
import MapInteractiveKey from '../../../../../components/custom/MapInteractiveKey'
import UnmatchedLocationInfo from '../../../../../pages/manage-locations/add-location/upload-locations-with-csv/components/UnmatchedLocationInfo'

export default function DropPinOnMapLayout ({
  navigateToNextPage,
  navigateToDropPinLocationSearchPage,
  navigateToNotInEnglandPage,
  flow
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const showMarkerInitially = location?.state?.mapArea == null
  let { latitude, longitude } = useSelector(
    (state) => state.session.currentLocation.coordinates
  )
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const [displayCoords, setDisplayCoords] = useState('')
  const [pinCoords, setPinCoords] = useState(null)
  const [error, setError] = useState('')
  const [showFloodWarningAreas, setShowFloodWarningAreas] = useState(true)
  const [showFloodAlertAreas, setShowFloodAlertAreas] = useState(true)
  const [showFloodExtents, setShowFloodExtents] = useState(true)

  const pinDropCoordsDisplay = () => {
    if (pinCoords) {
      latitude = pinCoords.latitude
      longitude = pinCoords.longitude
    }

    const { easting, northing } = convertCoordinatesToEspg27700(
      longitude,
      latitude
    )
    dispatch(setCurrentLocationEasting(easting))
    dispatch(setCurrentLocationNorthing(northing))

    return `${Math.trunc(easting)}, ${Math.trunc(northing)}`
  }

  useEffect(() => {
    setDisplayCoords(pinDropCoordsDisplay())
  }, [pinCoords, latitude, longitude])

  // remove error if user drops a pin
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [pinCoords])

  const handleSubmit = async () => {
    if (!pinCoords) {
      setError('Click on the map to drop a pin')
    } else {
      const inEngland = await locationInEngland(
        pinCoords.latitude,
        pinCoords.longitude
      )
      if (inEngland) {
        dispatch(setCurrentLocationCoordinates(pinCoords))

        const locationToAdd = store.getState().session.currentLocation
        const dataToSend = { authToken, orgId, location: locationToAdd }
        const { data, errorMessage } = await backendCall(
          dataToSend,
          'api/location/create',
          navigate
        )

        if (data) {
          dispatch(setCurrentLocation(data))

          // Remove invalid location from elasticache
          if (flow?.includes('unmatched-locations')) {
            await backendCall(
              { orgId, locationId: locationToAdd.id },
              'api/bulk_uploads/remove_invalid_location',
              navigate
            )
          }

          navigateToNextPage()
        } else {
          errorMessage
            ? setError(errorMessage)
            : setError('Oops, something went wrong')
        }
      } else {
        navigateToNotInEnglandPage()
      }
    }
  }

  const navigateToLocationSearch = (event) => {
    event.preventDefault()
    navigateToDropPinLocationSearchPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>Find the location on a map</h1>
            <div className='govuk-body'>
              <p>
                Click on the map to drop a pin where you think this location is.
                You can then add the location to this account.
              </p>

              {flow?.includes('unmatched-locations') && (
                <UnmatchedLocationInfo />
              )}
            </div>
          </div>
          <div class='govuk-grid-column-three-quarters '>
            <div className='govuk-body'>
              <div className='govuk-!-margin-bottom-4'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {location.state && (
                    <>
                      {' '}
                      <span style={{ marginRight: '8px' }}>Map area:</span>
                      <span style={{ marginRight: '16px' }}>
                        {location.state?.mapArea}
                      </span>
                    </>
                  )}
                  <Link
                    className='govuk-link'
                    onClick={(e) => navigateToLocationSearch(e)}
                  >
                    Search with a different place name, town or postcode
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div class='govuk-grid-row'>
            <div class='govuk-grid-column-three-quarters '>
              <Map
                setCoordinates={setPinCoords}
                type='drop'
                showFloodWarningAreas={showFloodWarningAreas}
                showFloodAlertAreas={showFloodAlertAreas}
                showMarker={showMarkerInitially}
              />
            </div>
            <div class='govuk-grid-column-one-quarter'>
              <MapInteractiveKey
                showFloodWarningAreas={showFloodWarningAreas}
                setShowFloodWarningAreas={setShowFloodWarningAreas}
                showFloodAlertAreas={showFloodAlertAreas}
                setShowFloodAlertAreas={setShowFloodAlertAreas}
                showFloodExtents={showFloodExtents}
                setShowFloodExtents={setShowFloodExtents}
              />
            </div>
          </div>

          <div class='govuk-grid-row'>
            <div class='govuk-grid-column-three-quarters'>
              <div
                className='govuk-caption-container'
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
                  This is not a live flood map
                </span>
                {pinCoords && (
                  <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-margin-top-4'>
                    X and Y {displayCoords}
                  </span>
                )}
              </div>
              <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-margin-top-1'>
                It shows fixed areas that we provide flood warnings and alerts
                for.
              </span>
            </div>
          </div>
          <Button
            className='govuk-button govuk-!-margin-top-6'
            text={
              useLocation().pathname.includes('add') ||
              flow?.includes('unmatched-locations')
                ? 'Add location'
                : 'Save location'
            }
            onClick={handleSubmit}
          />
          <Link
            onClick={navigateBack}
            className='govuk-body govuk-link inline-link govuk-!-margin-top-6 govuk-!-margin-left-2'
          >
            Cancel
          </Link>
        </div>
      </main>
    </>
  )
}
