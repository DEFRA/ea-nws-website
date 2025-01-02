import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import {
  getLocationAdditional,
  getLocationOther,
  setCurrentLocationCoordinates
} from '../../../../../../common/redux/userSlice'
import { convertCoordinatesToEspg27700 } from '../../../../../../common/services/CoordinatesFormatConverter'
import { locationInEngland } from '../../../../../../common/services/validations/LocationInEngland'
import Map from '../../../../../components/custom/Map'
import MapInteractiveKey from '../../../../../components/custom/MapInteractiveKey'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

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

    const { northing, easting } = convertCoordinatesToEspg27700(
      longitude,
      latitude
    )

    return `${Math.trunc(northing)}, ${Math.trunc(easting)}`
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

  const LocationDetails = () => {
    const locationName = useSelector((state) =>
      getLocationAdditional(state, 'locationName')
    )
    const locationFullAddress = useSelector((state) =>
      getLocationOther(state, 'full_address')
    )
    const locationXcoordinate = useSelector((state) =>
      getLocationOther(state, 'x_coordinate')
    )
    const locationYcoordinate = useSelector((state) =>
      getLocationOther(state, 'y_coordinate')
    )

    return (
      <div className='govuk-inset-text'>
        <strong>{locationName}</strong>
        {locationFullAddress && (
          <>
            <br />
            {locationFullAddress}
          </>
        )}
        <br />
        {locationXcoordinate && locationYcoordinate && (
          <>
            <br />
            {locationXcoordinate}, {locationYcoordinate}
          </>
        )}
      </div>
    )
  }

  const handleSubmit = async () => {
    if (pinCoords === '') {
      setError('Click on the map to drop a pin')
    } else {
      const inEngland = await locationInEngland(
        pinCoords.latitude,
        pinCoords.longitude
      )
      if (inEngland) {
        dispatch(setCurrentLocationCoordinates(pinCoords))
        // TODO: Send currentLocation object to elasticache and geosafe, then navigate
        navigateToNextPage()
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
      <OrganisationAccountNavigation
        currentPage={orgManageLocationsUrls.view.dashboard}
      />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>Find the location on a map</h1>
            <div className='govuk-body'>
              <p>
                Click on the map to drop a pin where you think this location is.
                You can then add the location to this account.
              </p>

              {flow === 'unmatched-locations' && <LocationDetails />}

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
              <div class='govuk-grid-row'>
                <div class='govuk-grid-column-two-thirds'>
                  <Map
                    setCoordinates={setPinCoords}
                    type='drop'
                    showFloodWarningAreas={showFloodWarningAreas}
                    showFloodAlertAreas={showFloodAlertAreas}
                    showMarker={showMarkerInitially}
                  />
                </div>
                <div class='govuk-grid-column-one-third'>
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
                <div class='govuk-grid-column-two-thirds'>
                  <div
                    className='govuk-caption-container'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
                      This is not a live flood map
                    </span>
                    <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-margin-top-1'>
                      X and Y {displayCoords}
                    </span>
                  </div>
                  <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-margin-top-1'>
                    It shows fixed areas that we provide flood warnings and
                    alerts for.
                  </span>
                </div>
              </div>
            </div>
            <Button
              className='govuk-button govuk-!-margin-top-4'
              text={
                useLocation().pathname.includes('add') ||
                flow === 'unmatched-locations'
                  ? 'Add location'
                  : 'Save location'
              }
              onClick={handleSubmit}
            />
            <Link
              onClick={navigateBack}
              className='govuk-body govuk-link inline-link govuk-!-margin-top-4 govuk-!-margin-left-2'
            >
              Cancel
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
