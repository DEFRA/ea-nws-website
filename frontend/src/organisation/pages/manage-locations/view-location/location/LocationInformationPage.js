import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Details from '../../../../../common/components/gov-uk/Details'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import FloodWarningKey from '../../../../components/custom/FloodWarningKey'
import Map from '../../../../components/custom/Map'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import LocationHeader from './location-information-components/LocationHeader'

export default function LocationInformationPage () {
  const navigate = useNavigate()
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const additionalData = currentLocation.meta_data.location_additional
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
        // code to return shape area
        return <>2 square km (dummy data)</>
      case LocationDataType.SHAPE_LINE:
        // code to return length of line
        return <>0.5km (dummy data)</>
      case LocationDataType.BOUNDARY:
        // code to return boundary name
        return <>Unitary Authority (dummy data)</>
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
            className='govuk-link govuk-!-display-inline-block'
            style={{ float: 'right' }}
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
      <p>
        Flood risk is based on a combination of likelihood and impact - how
        likely it is that flooding will happen and the effect that flooding will
        have on people, buildings and services. Flood risk can fall into the
        following categories:
      </p>
      <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
        High Risk
      </h3>
      <p>
        Each year there’s a chance of flooding from rivers and the sea of
        greater than 1 in 30.
      </p>
      <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
        Medium Risk
      </h3>
      <p>
        Each year there’s a chance of flooding from rivers and the sea of
        between 1 in 100 and 1 in 30.
      </p>
      <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
        Low Risk
      </h3>
      <p>
        Each year there’s a chance of flooding from rivers and the sea of
        between 1 in 1000 and 1 in 100.
      </p>
      <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
        Possible
      </h3>
      <p>
        Flooding is possible in the local area when groundwater levels are high.
      </p>
      <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
        Unlikely
      </h3>
      <p>
        It’s unlikely the location will be affected by groundwater flooding.
      </p>
    </>
  )

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(orgManageLocationsUrls.view.dashboard)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-4'>
        <LocationHeader currentPage='/organisation/manage-locations/locations/view' />
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
                  className='govuk-link govuk-!-display-inline-block'
                  style={{ float: 'right' }}
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
                    className='govuk-link govuk-!-display-inline-block'
                    style={{ float: 'right' }}
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
                  <p>{additionalData.location_name}</p>
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
            {additionalData.keywords && (
              <div className='govuk-!-margin-top-7'>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Keywords
                </h2>
                <Link
                  className='govuk-link govuk-!-display-inline-block'
                  style={{ float: 'right' }}
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
                  className='govuk-link govuk-!-display-inline-block'
                  style={{ float: 'right' }}
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
                  className='govuk-link govuk-!-display-inline-block'
                  style={{ float: 'right' }}
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
              {!currentLocation.address &&
                additionalData.location_data_type !==
                  LocationDataType.BOUNDARY && (
                    <Link
                      className='govuk-!-display-block govuk-!-margin-bottom-1'
                      to={
                      orgManageLocationsUrls.edit.individualLocation
                        .optionalInformation.address
                    }
                    >
                      Add address
                    </Link>
              )}
              {!additionalData.internal_reference &&
                additionalData.location_data_type !==
                  LocationDataType.BOUNDARY && (
                    <Link
                      className='govuk-!-display-block govuk-!-margin-bottom-1'
                      to={
                      orgManageLocationsUrls.edit.individualLocation
                        .optionalInformation.keyInformation
                    }
                    >
                      Add internal reference
                    </Link>
              )}
              {!additionalData.business_criticality &&
                additionalData.location_data_type !==
                  LocationDataType.BOUNDARY && (
                    <Link
                      className='govuk-!-display-block govuk-!-margin-bottom-1'
                      to={
                      orgManageLocationsUrls.edit.individualLocation
                        .optionalInformation.keyInformation
                    }
                    >
                      Add business criticality
                    </Link>
              )}
              {!additionalData.location_type &&
                additionalData.location_data_type !==
                  LocationDataType.BOUNDARY && (
                    <Link
                      className='govuk-!-display-block govuk-!-margin-bottom-1'
                      to={
                      orgManageLocationsUrls.edit.individualLocation
                        .optionalInformation.keyInformation
                    }
                    >
                      Add location type
                    </Link>
              )}
              {!additionalData.keywords && (
                <Link
                  className='govuk-!-display-block govuk-!-margin-bottom-1'
                  to={
                    orgManageLocationsUrls.edit.individualLocation
                      .optionalInformation.keywords
                  }
                >
                  Add keywords
                </Link>
              )}
              {!additionalData.action_plan && (
                <Link
                  className='govuk-!-display-block govuk-!-margin-bottom-1'
                  to={
                    orgManageLocationsUrls.edit.individualLocation
                      .optionalInformation.actionPlan
                  }
                >
                  Add action plan
                </Link>
              )}
              {!additionalData.notes && (
                <Link
                  className='govuk-!-display-block'
                  to={
                    orgManageLocationsUrls.edit.individualLocation
                      .optionalInformation.notes
                  }
                >
                  Add notes
                </Link>
              )}
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
            <div className='govuk-!-margin-top-4'>
              <FloodWarningKey type='both' />
            </div>
            <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
              This is not a live flood map
            </span>
            <span className='govuk-caption-m govuk-!-font-size-16'>
              It shows fixed areas we provide flood warnings and alerts for
            </span>
            <div className=' govuk-!-margin-top-4'>
              <RoomOutlinedIcon style={{ fontSize: 30 }} />
              <Link>Open Map</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
