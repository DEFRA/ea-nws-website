import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import AlertType from '../../../../../common/enums/AlertType'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import {
  getLocationAdditional,
  getLocationOther,
  setCurrentLocation,
  setNotFoundLocations,
  setNotInEnglandLocations
} from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { getFloodAreas, getFloodAreasFromShape, getGroundwaterFloodRiskRatingOfLocation, getRiversAndSeaFloodRiskRatingOfLocation } from '../../../../../common/services/WfsFloodDataService'
import {
  geoSafeToWebLocation,
  webToGeoSafeLocation
} from '../../../../../common/services/formatters/LocationFormatter'
import FloodWarningKey from '../../../../components/custom/FloodWarningKey'
import Map from '../../../../components/custom/Map'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmLocationLayout ({
  navigateToNextPage,
  navigateToPinDropFlow,
  flow
}) {
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const locationName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )

  const currentPostCode = useSelector((state) =>
    getLocationOther(state, 'postcode')
  )
  const currentAddress = useSelector((state) =>
    getLocationOther(state, 'full_address')
  )
  const formattedAddress = currentAddress ? currentAddress.split(',') : ''
  const xCoord = Math.round(
    useSelector((state) => getLocationOther(state, 'x_coordinate'))
  )
  const yCoord = Math.round(
    useSelector((state) => getLocationOther(state, 'y_coordinate'))
  )
  const notFoundLocations = useSelector(
    (state) => state.session.notFoundLocations
  )
  const notInEnglandLocations = useSelector(
    (state) => state.session.notInEnglandLocations
  )
  const currentLocationDataType = useSelector((state) =>
    getLocationOther(state, 'location_data_type')
  )

  const shapeArea = location.state?.shapeArea
  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId () {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

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

  // Switch case to change the button/link logic depending on the location type
  const handleSubmit = async (event) => {
    event.preventDefault()
    const duplicateLocation = await checkDuplicateLocation()

    // Check for duplicates
    if (duplicateLocation) {
      navigate(orgManageLocationsUrls.add.duplicateLocationComparisonPage, {
        state: {
          existingLocation: geoSafeToWebLocation(duplicateLocation),
          newLocation: geoSafeToWebLocation(currentLocation),
          numDuplicates: 1,
          flow
        }
      })

      return
    }

    const newWebLocation = geoSafeToWebLocation(JSON.parse(JSON.stringify(currentLocation)))
    // set the Target areas
    if (currentLocationDataType === LocationDataType.X_AND_Y_COORDS) {
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
    } else if (newWebLocation?.geometry?.geoJson) {
      const TAs = await getFloodAreasFromShape(newWebLocation?.geometry?.geoJson)
      newWebLocation.additionals.other.targetAreas = []
      TAs.forEach((area) => {
        newWebLocation.additionals.other.targetAreas.push({
          TA_CODE: area.properties?.TA_CODE,
          TA_Name: area.properties?.TA_Name,
          category: area.properties?.category
        })
      })
      newWebLocation.additionals.other.riverSeaRisk = 'unavailable'
      newWebLocation.additionals.other.groundWaterRisk = 'unavailable'
    } else {
      newWebLocation.additionals.other.targetAreas = []
      newWebLocation.additionals.other.riverSeaRisk = 'unavailable'
      newWebLocation.additionals.other.groundWaterRisk = 'unavailable'
    }

    // Set alert types
    newWebLocation.additionals.other.alertTypes = []
    const categoryToType = (type) => {
      const typeMap = {
        'Flood Warning': 'warning',
        'Flood Warning Groundwater': 'warning',
        'Flood Warning Rapid Response': 'warning',
        'Flood Alert': 'alert',
        'Flood Alert Groundwater': 'alert'
      }
      return typeMap[type] || []
    }
    newWebLocation.additionals.other.targetAreas.some((area) => categoryToType(area.category) === 'warning') &&
      newWebLocation.additionals.other.alertTypes.push(AlertType.SEVERE_FLOOD_WARNING) &&
      newWebLocation.additionals.other.alertTypes.push(AlertType.FLOOD_WARNING)

    newWebLocation.additionals.other.targetAreas.some((area) => categoryToType(area.category) === 'alert') &&
      newWebLocation.additionals.other.alertTypes.push(AlertType.FLOOD_ALERT)

    const newGeosafeLocation = webToGeoSafeLocation(newWebLocation)

    // since we added to currentLocation we need to get that information to pass to the api
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
          alertTypes: newWebLocation.additionals.other.alertTypes
        }
      }

      await backendCall(
        registerData,
        'api/location/register_to_partner',
        navigate
      )

      // need to set the current location due to geosafe creating the ID.
      dispatch(setCurrentLocation(data))

      // Remove invalid location from elasticache
      if (flow?.includes('unmatched-locations')) {
        backendCall(
          { orgId, locationId: currentLocation.id },
          'api/bulk_uploads/remove_invalid_location',
          navigate
        )

        flow?.includes('not-in-england')
          ? dispatch(setNotInEnglandLocations(notInEnglandLocations - 1))
          : dispatch(setNotFoundLocations(notFoundLocations - 1))
      }

      if (flow?.includes('not-found') && notFoundLocations - 1 === 0) {
        if (notInEnglandLocations > 0) {
          // Find locations not in England
          navigate(
            orgManageLocationsUrls.unmatchedLocations.notInEngland.dashboard
          )
        } else {
          navigate(orgManageLocationsUrls.add.contactLinkInfo)
        }
      } else if (
        flow?.includes('not-in-england') &&
        notInEnglandLocations - 1 === 0
      ) {
        navigate(orgManageLocationsUrls.add.contactLinkInfo)
      } else {
        navigateToNextPage()
      }
    } else {
      errorMessage
        ? setError(errorMessage)
        : setError('Oops, something went wrong')
    }
  }

  const handleNavigateToPinDropFlow = (event) => {
    event.preventDefault()
    navigateToPinDropFlow()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    currentLocationDataType === LocationDataType.SHAPE_POLYGON ||
    currentLocationDataType === LocationDataType.SHAPE_LINE
      ? navigate(orgManageLocationsUrls.add.uploadLocationsWithShapefile)
      : navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l '>Confirm location</h1>

            <h2 className='govuk-heading-m govuk-!-margin-top-8'>
              {locationName}
            </h2>
            <hr />

            {currentAddress && (
              <>
                <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                  Address
                </h3>
                <p>
                  {formattedAddress.map((line, index) => {
                    return (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    )
                  })}
                  {currentPostCode && currentPostCode}
                </p>
              </>
            )}

            {/* X and Y coordinates layout (default) */}
            {currentLocationDataType === LocationDataType.X_AND_Y_COORDS && (
              <>
                <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-top-6 govuk-!-margin-bottom-0'>
                  X and Y Coordinates
                </h3>
                <p>
                  {xCoord}
                  {', '}
                  {yCoord}
                </p>

                <Link
                  onClick={(e) => handleNavigateToPinDropFlow(e)}
                  className='govuk-link'
                >
                  Move pin position
                </Link>

                <div className='govuk-!-margin-top-8'>
                  <Button
                    text={
                      flow?.includes('unmatched-locations')
                        ? 'Add location'
                        : 'Confirm location'
                    }
                    className='govuk-button'
                    onClick={handleSubmit}
                  />{' '}
                  <Link
                    onClick={navigateBack}
                    className='govuk-body govuk-link inline-link'
                  >
                    Cancel
                  </Link>
                </div>
              </>
            )}

            {/* Shapefile layout */}
            {(currentLocationDataType === LocationDataType.SHAPE_POLYGON ||
              currentLocationDataType === LocationDataType.SHAPE_LINE) && (
                <>
                  <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                    Polygon
                  </h3>
                  <p>{shapeArea} square metres</p>

                  <div className='govuk-!-margin-top-8'>
                    <Button
                      text='Add and continue'
                      className='govuk-button'
                      onClick={handleSubmit}
                    />
                    <Button
                      text='Cancel upload'
                      className='govuk-button govuk-button--warning govuk-!-margin-left-3'
                      onClick={navigateBack}
                    />
                  </div>
                </>
            )}
          </div>
          <div
            className='govuk-grid-column-one-half'
            style={{ marginTop: '95px' }}
          >
            <Map showMapControls={false} zoomLevel={14} />
            <div className='govuk-!-column-one-third'>
              <FloodWarningKey />
            </div>
            <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
              This is not a live flood map
            </span>
            <span className='govuk-caption-m govuk-!-font-size-16'>
              it shows fixed areas that we provide flood warnings and alerts for
            </span>
          </div>
        </div>
      </main>
    </>
  )
}
