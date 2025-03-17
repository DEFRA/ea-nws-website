import { area } from '@turf/turf'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import locationPin from '../../../../../common/assets/images/location_pin.svg'
import BackLink from '../../../../../common/components/custom/BackLink'
import Details from '../../../../../common/components/gov-uk/Details'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import { getLocationAdditionals } from '../../../../../common/redux/userSlice'
import FloodWarningKey from '../../../../components/custom/FloodWarningKey'
import Map from '../../../../components/custom/Map'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import FullscreenMap from '../FullscreenMap'
import LocationHeader from './location-information-components/LocationHeader'

export default function LocationInformationPage () {
  const navigate = useNavigate()
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const additionalData = useSelector((state) => getLocationAdditionals(state))
  const [showMap, setShowMap] = useState(false)
  const keywords = additionalData.keywords
    ? JSON.parse(additionalData.keywords)
    : []

  const formattedAddress = currentLocation.address?.split(',')

  const LocationDetailsHeader = () => {
    switch (additionalData.location_data_type) {
      case LocationDataType.X_AND_Y_COORDS:
        return 'X and Y Coordinates'
      case LocationDataType.SHAPE_POLYGON:
        return 'Polygon'
      case LocationDataType.SHAPE_LINE:
        return 'Line'
      case LocationDataType.BOUNDARY:
        return 'Boundary type'
    }
  }

  const getShapePolygonArea = () => {
    if (!currentLocation.geometry || currentLocation.geometry.type !== 'Feature' || !currentLocation.geometry.geometry) {
      return 0
    }

    const formatShapeArea = (area) => {
      return area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') // Separate area with commas
    }

    return formatShapeArea(Math.round(area(currentLocation.geometry) / 1000))
  }

  const LocationData = () => {
    switch (additionalData.location_data_type) {
      case LocationDataType.X_AND_Y_COORDS:
        return (
          <>
            {Math.trunc(additionalData.x_coordinate)}
            {', '}
            {Math.trunc(additionalData.y_coordinate)}
          </>
        )
      case LocationDataType.SHAPE_POLYGON:
        return <>{getShapePolygonArea()} square metres</>
      case LocationDataType.SHAPE_LINE:
        // code to return length of line
        return <>0.5km (dummy data)</>
      case LocationDataType.BOUNDARY:
        return <>{additionalData.location_type}</>
    }
  }

  const navigateToChangeLocation = (event) => {
    event.preventDefault()
    switch (additionalData.location_data_type) {
      case LocationDataType.X_AND_Y_COORDS:
        navigate(orgManageLocationsUrls.edit.individualLocation.location.search)
        break
      case LocationDataType.SHAPE_POLYGON:
        navigate(
          orgManageLocationsUrls.edit.individualLocation.location.shape.polygon
        )
        break
      case LocationDataType.SHAPE_LINE:
        navigate(
          orgManageLocationsUrls.edit.individualLocation.location.shape.line
        )
        break
    }
  }

  const locationDetails = (
    <>
      <div className={currentLocation.address ? 'govuk-!-margin-top-7' : ''}>
        <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
          Location
        </h2>
        {additionalData.location_data_type !== LocationDataType.BOUNDARY && (
          <Link
            className='govuk-link right'
            onClick={(e) => navigateToChangeLocation(e)}
          >
            Change
          </Link>
        )}
        <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
        <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-top-1 govuk-!-margin-bottom-0'>
          {LocationDetailsHeader()}
        </h3>
        <p className='govuk-!-margin-top-1'>{LocationData()}</p>
      </div>
    </>
  )

  const floodRiskDetails = (
    <>
      Flood risk is based on a combination of likelihood and impact – how likely
      it is that flooding will happen and the effect that flooding will have on
      people, buildings and services. Flood risk can fall into the following
      categories:
      <h4 className='govuk-heading-m govuk-!-margin-top-6'>Rivers and sea</h4>
      <p className='govuk-!-margin-top-4'>
        <strong>High risk</strong>
        <br />
        Each year there's a chance of flooding from rivers and the sea of
        greater than 1 in 30.
      </p>
      <p className='govuk-!-margin-top-4'>
        <strong>Medium risk</strong>
        <br />
        Each year there's a chance of flooding from rivers and the sea of
        between 1 in 100 and 1 in 30.
      </p>
      <p className='govuk-!-margin-top-4'>
        <strong>Low risk</strong>
        <br />
        Each year there's a chance of flooding from rivers and the sea of
        between 1 in 1000 and 1 in 100.
      </p>
      <h4 className='govuk-heading-m  govuk-!-margin-top-6'>Groundwater</h4>
      <p className='govuk-!-margin-top-4'>
        <strong>Possible</strong>
        <br />
        Flooding is possible in the local area when groundwater levels are high.
      </p>
      <p className='govuk-!-margin-top-4'>
        <strong>Unlikely</strong>
        <br />
        It's unlikely the location will be affected by groundwater flooding.
      </p>
    </>
  )

  const openMap = () => {
    setShowMap(true)
  }

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(orgManageLocationsUrls.view.dashboard)
  }

  return (
    <>

      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-4'>
        <LocationHeader
          currentPage={orgManageLocationsUrls.view.viewLocation}
        />
        {/* details */}
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {/* Address details */}
            {currentLocation.address && (
              <>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Address
                </h2>
                <Link
                  className='govuk-link right'
                  to={
                    orgManageLocationsUrls.edit.individualLocation
                      .optionalInformation.address
                  }
                >
                  Change
                </Link>
                <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                <p>
                  {formattedAddress.map((line, index) => {
                    return (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    )
                  })}
                </p>
              </>
            )}
            {/* Location details */}
            {locationDetails}
            {/* Key Information details */}
            {additionalData.location_data_type !==
              LocationDataType.BOUNDARY && (
                <div className='govuk-!-margin-top-7'>
                  <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                    Key Information
                  </h2>
                  <Link
                    className='govuk-link right'
                    to={
                    orgManageLocationsUrls.edit.individualLocation
                      .optionalInformation.keyInformation
                  }
                  >
                    Change
                  </Link>
                  <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                  <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                    Location name
                  </h3>
                  <p>{additionalData.locationName}</p>
                  {additionalData.internal_reference && (
                    <>
                      <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                        Internal reference
                      </h3>
                      <p>{additionalData.internal_reference}</p>
                    </>
                  )}
                  {additionalData.business_criticality && (
                    <>
                      <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                        Business criticality
                      </h3>
                      <p>{additionalData.business_criticality}</p>
                    </>
                  )}
                  {additionalData.location_type && (
                    <>
                      <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                        Location type
                      </h3>
                      <p>{additionalData.location_type}</p>
                    </>
                  )}
                </div>
            )}

            {/* Keywords details */}
            {keywords.length > 0 && (
              <div className='govuk-!-margin-top-7'>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Keywords
                </h2>
                <Link
                  className='govuk-link right'
                  to={
                    orgManageLocationsUrls.edit.individualLocation
                      .optionalInformation.keywords
                  }
                >
                  Change
                </Link>
                <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                <p>{keywords.join(', ')}</p>
              </div>
            )}

            {/* Action plan details */}
            {additionalData.action_plan && (
              <div className='govuk-!-margin-top-7'>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Action Plan
                </h2>
                <Link
                  className='govuk-link right'
                  to={
                    orgManageLocationsUrls.edit.individualLocation
                      .optionalInformation.actionPlan
                  }
                >
                  Change
                </Link>
                <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                <pre>{additionalData.action_plan}</pre>
              </div>
            )}

            {/* Notes details */}
            {additionalData.notes && (
              <div className='govuk-!-margin-top-7'>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Notes
                </h2>
                <Link
                  className='govuk-link right'
                  to={
                    orgManageLocationsUrls.edit.individualLocation
                      .optionalInformation.notes
                  }
                >
                  Change
                </Link>
                <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                <p>{additionalData.notes}</p>
              </div>
            )}

            {/* Add more info links */}
            <div className='govuk-!-font-size-19 govuk-!-margin-top-7'>
              <div className='govuk-!-margin-bottom-1'>
                {!currentLocation.address &&
                  additionalData.location_data_type !==
                    LocationDataType.BOUNDARY && (
                      <Link
                        className='govuk-link'
                        to={
                        orgManageLocationsUrls.edit.individualLocation
                          .optionalInformation.address
                      }
                      >
                        Add address
                      </Link>
                )}
              </div>
              <div className='govuk-!-margin-bottom-1'>
                {!additionalData.internal_reference &&
                  additionalData.location_data_type !==
                    LocationDataType.BOUNDARY && (
                      <Link
                        className='govuk-link'
                        to={
                        orgManageLocationsUrls.edit.individualLocation
                          .optionalInformation.keyInformation
                      }
                      >
                        Add internal reference
                      </Link>
                )}
              </div>
              <div className='govuk-!-margin-bottom-1'>
                {!additionalData.business_criticality &&
                  additionalData.location_data_type !==
                    LocationDataType.BOUNDARY && (
                      <Link
                        className='govuk-link'
                        to={
                        orgManageLocationsUrls.edit.individualLocation
                          .optionalInformation.keyInformation
                      }
                      >
                        Add business criticality
                      </Link>
                )}
              </div>
              <div className='govuk-!-margin-bottom-1'>
                {!additionalData.location_type &&
                  additionalData.location_data_type !==
                    LocationDataType.BOUNDARY && (
                      <Link
                        className='govuk-link'
                        to={
                        orgManageLocationsUrls.edit.individualLocation
                          .optionalInformation.keyInformation
                      }
                      >
                        Add location type
                      </Link>
                )}
              </div>
              <div className='govuk-!-margin-bottom-1'>
                {(!keywords || keywords.length === 0) && (
                  <Link
                    className='govuk-link'
                    to={
                      orgManageLocationsUrls.edit.individualLocation
                        .optionalInformation.keywords
                    }
                  >
                    Add keywords
                  </Link>
                )}
              </div>
              <div className='govuk-!-margin-bottom-1'>
                {!additionalData.action_plan && (
                  <Link
                    className='govuk-link'
                    to={
                      orgManageLocationsUrls.edit.individualLocation
                        .optionalInformation.actionPlan
                    }
                  >
                    Add action plan
                  </Link>
                )}
              </div>
              <div>
                {!additionalData.notes && (
                  <Link
                    className='govuk-link'
                    to={
                      orgManageLocationsUrls.edit.individualLocation
                        .optionalInformation.notes
                    }
                  >
                    Add notes
                  </Link>
                )}
              </div>
            </div>
            {/* flood risk details */}
            {additionalData.location_data_type ===
              LocationDataType.X_AND_Y_COORDS && (
                <div className='govuk-!-margin-top-7'>
                  <Details
                    title='What is a flood risk?'
                    text={floodRiskDetails}
                  />
                </div>
            )}
          </div>
          {/* other half - map */}
              <div className='govuk-grid-column-one-half'>
                <Map showMapControls={false} zoomLevel={14} />
                <FloodWarningKey />
                <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
                  This is not a live flood map
                </span>
                <span className='govuk-caption-m govuk-!-font-size-16'>
                  it shows fixed areas that we provide flood warnings and alerts for
                </span>
                <div className=' govuk-!-margin-top-4' style={{ display: 'flex', marginLeft: '-0.5rem' }}>
                  <img src={locationPin} alt='Location pin icon' />
                  <Link className='govuk-link' onClick={openMap}>Open map</Link>
                </div>
                {showMap && (
                  <FullscreenMap
                    showMap={showMap}
                    setShowMap={setShowMap}
                    locations={[currentLocation]}
                  />
                )}
              </div>
        </div>
      </main>
    </>
  )
}
