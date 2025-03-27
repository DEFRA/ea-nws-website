import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import AlertType from '../../../../../../common/enums/AlertType'
import store from '../../../../../../common/redux/store'
import {
  getLocationAdditional,
  setCurrentLocation,
  setCurrentLocationCoordinates,
  setCurrentLocationEasting,
  setCurrentLocationNorthing,
  setNotFoundLocations,
  setNotInEnglandLocations
} from '../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../common/services/BackendService'
import { convertCoordinatesToEspg27700 } from '../../../../../../common/services/CoordinatesFormatConverter'
import { getFloodAreas, getGroundwaterFloodRiskRatingOfLocation, getRiversAndSeaFloodRiskRatingOfLocation } from '../../../../../../common/services/WfsFloodDataService'
import { geoSafeToWebLocation, webToGeoSafeLocation } from '../../../../../../common/services/formatters/LocationFormatter'
import { locationInEngland } from '../../../../../../common/services/validations/LocationInEngland'
import Map from '../../../../../components/custom/Map'
import MapInteractiveKey from '../../../../../components/custom/MapInteractiveKey'
import UnmatchedLocationInfo from '../../../../../pages/manage-locations/add-location/upload-locations-with-csv/components/UnmatchedLocationInfo'
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
  const locationName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )
  const notFoundLocations = useSelector(
    (state) => state.session.notFoundLocations
  )
  const notInEnglandLocations = useSelector(
    (state) => state.session.notInEnglandLocations
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

  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId () {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  useEffect(() => {
    setDisplayCoords(pinDropCoordsDisplay())
  }, [pinCoords, latitude, longitude])

  // remove error if user drops a pin
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [pinCoords])

  const checkDuplicateLocation = async () => {
    const dataToSend = {
      orgId,
      locationName,
      type: 'valid'
    }
    const { data } = await backendCall(
      dataToSend,
      'api/locations/search',
      navigate
    )

    if (data) {
      return data[0]
    } else {
      return null
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!pinCoords) {
      setError('Click on the map to drop a pin')
    } else {
      dispatch(setCurrentLocationCoordinates(pinCoords))
      const locationToAdd = store.getState().session.currentLocation
      const inEngland = await locationInEngland(
        pinCoords.latitude,
        pinCoords.longitude
      )
      const duplicateLocation = await checkDuplicateLocation()

      if (inEngland && !duplicateLocation) {
        // Set default alert types
        const newWebLocation = geoSafeToWebLocation(locationToAdd)
        newWebLocation.additionals.other.alertTypes = [AlertType.SEVERE_FLOOD_WARNING, AlertType.FLOOD_WARNING, AlertType.FLOOD_ALERT]
        // get target areas
        const TAs = await getFloodAreas(newWebLocation.coordinates.latitude, newWebLocation.coordinates.longitude)
        newWebLocation.additionals.other.targetAreas = []
        TAs.forEach((area) => {
          newWebLocation.additionals.other.targetAreas.push({
            TA_CODE: area.properties?.TA_CODE,
            TA_Name: area.properties?.TA_Name,
            category: area.properties?.category
          })
        })
        newWebLocation.additionals.other.riverSeaRisk = await getRiversAndSeaFloodRiskRatingOfLocation(newWebLocation.coordinates.latitude, newWebLocation.coordinates.longitude)
        newWebLocation.additionals.other.groundWaterRisk = await getGroundwaterFloodRiskRatingOfLocation(newWebLocation.coordinates.latitude, newWebLocation.coordinates.longitude)
        const newGeosafeLocation = webToGeoSafeLocation(newWebLocation)

        const dataToSend = { authToken, orgId, location: newGeosafeLocation }
        const { data, errorMessage } = await backendCall(
          dataToSend,
          'api/location/create',
          navigate
        )

        if (data) {
          const registerData = {
            authToken,
            locationId: data.id,
            partnerId,
            params: {
              channelVoiceEnabled: true,
              channelSmsEnabled: true,
              channelEmailEnabled: true,
              channelMobileAppEnabled: true,
              partnerCanView: true,
              partnerCanEdit: true,
              alertTypes: [AlertType.SEVERE_FLOOD_WARNING, AlertType.FLOOD_WARNING, AlertType.FLOOD_ALERT]
            }
          }

          await backendCall(
            registerData,
            'api/location/register_to_partner',
            navigate
          )

          dispatch(setCurrentLocation(data))

          // Remove invalid location from elasticache
          if (flow?.includes('unmatched-locations')) {
            await backendCall(
              { orgId, locationId: locationToAdd.id },
              'api/bulk_uploads/remove_invalid_location',
              navigate
            )

            flow?.includes('not-in-england')
              ? dispatch(setNotInEnglandLocations(notInEnglandLocations - 1))
              : dispatch(setNotFoundLocations(notFoundLocations - 1))
          }

          if (
            flow?.includes('not-found') &&
            notFoundLocations - 1 === 0 &&
            notInEnglandLocations > 0
          ) {
            // Find locations not in England
            navigate(
              orgManageLocationsUrls.unmatchedLocations.notInEngland.dashboard
            )
          } else if (
            flow?.includes('not-in-england') &&
            notInEnglandLocations - 1 === 0
          ) {
            // TODO: Navigate to correct page once created
            navigate(orgManageLocationsUrls.view.dashboard)
          } else {
            navigateToNextPage()
          }
        } else {
          errorMessage
            ? setError(errorMessage)
            : setError('Oops, something went wrong')
        }
      } else if (inEngland && duplicateLocation) {
        navigate(orgManageLocationsUrls.add.duplicateLocationComparisonPage, {
          state: {
            existingLocation: geoSafeToWebLocation(duplicateLocation),
            newLocation: geoSafeToWebLocation(locationToAdd),
            numDuplicates: 1,
            flow
          }
        })
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
          <div className='govuk-grid-column-three-quarters '>
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

          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-three-quarters '>
              <Map
                setCoordinates={setPinCoords}
                type='drop'
                showFloodWarningAreas={showFloodWarningAreas}
                showFloodAlertAreas={showFloodAlertAreas}
                showMarker={showMarkerInitially}
              />
            </div>
            <div className='govuk-grid-column-one-quarter'>
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

          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-three-quarters'>
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
                it shows fixed areas that that we provide flood warnings and alerts
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
