import { area } from '@turf/turf'
import LocationDataType from '../../../../../../../common/enums/LocationDataType'
import FloodWarningKey from '../../../../../../components/custom/FloodWarningKey'
import Map from '../../../../../../components/custom/Map'

export default function LocationInformation ({ location, comparedLocation }) {
  const additionalData = location?.additionals?.other
  const formattedAddress = (
    additionalData?.full_address +
    ', ' +
    additionalData?.postcode
  )?.split(',')
  const comparedAdditionalData = comparedLocation?.additionals?.other
  const comparedFormattedAddress = (
    comparedAdditionalData?.full_address +
    ', ' +
    comparedAdditionalData?.postcode
  )?.split(',')

  const compareStyle = {
    backgroundColor: '#D2E2F1',
    borderBottomStyle: 'solid',
    borderBottomColor: '#5694CA'
  }

  const sectionClassName =
    'govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-margin-top-7'
  const addressAdded =
    comparedLocation && comparedAdditionalData?.full_address === ''
  const locationNameAdded =
    comparedLocation && comparedLocation?.additionals?.locationName === null
  const internalReferenceAdded =
    comparedLocation && comparedAdditionalData?.internal_reference === ''
  const businessCriticalityAdded =
    comparedLocation && comparedAdditionalData?.business_criticality === ''
  const locationTypeAdded =
    comparedLocation && comparedAdditionalData?.location_type === ''
  const keywordsAdded =
    comparedLocation && comparedLocation?.additionals?.keywords?.length === 0
  const actionPlanAdded =
    comparedLocation && comparedAdditionalData?.action_plan?.length === 0
  const notesAdded = comparedLocation && comparedAdditionalData?.notes === ''

  const isShapeFile =
    additionalData?.location_data_type === LocationDataType.SHAPE_POLYGON ||
    additionalData?.location_data_type === LocationDataType.SHAPE_LINE

  const LocationHeader = () => {
    switch (additionalData?.location_data_type) {
      case LocationDataType.ADDRESS:
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

  const calculateShapeArea = () => {
    if (!location.geometry) {
      return 0
    }

    const formatShapeArea = (area) => {
      return area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') // Separate area with commas
    }
    
    return formatShapeArea(Math.round(area(location.geometry.geoJson) / 1000))
  }

  const LocationData = () => {
    switch (additionalData?.location_data_type) {
      case LocationDataType.ADDRESS:
      case LocationDataType.X_AND_Y_COORDS:
        return (
          <div
            style={
              comparedLocation &&
              (comparedAdditionalData?.x_coordinate !==
                additionalData?.x_coordinate ||
                comparedAdditionalData?.y_coordinate !==
                  additionalData?.y_coordinate)
                ? compareStyle
                : {}
            }
          >
            {Math.trunc(additionalData?.x_coordinate)}
            {', '}
            {Math.trunc(additionalData?.y_coordinate)}
          </div>
        )
      case LocationDataType.SHAPE_POLYGON:
        return (
          <div
            style={
              comparedLocation &&
              area(comparedLocation?.geometry?.geoJson) !== area(location?.geometry?.geoJson)
                ? compareStyle
                : {}
            }
          >
            {calculateShapeArea()} square metres
          </div>
        )
      case LocationDataType.SHAPE_LINE:
        // code to return length of line
        return <>0.5km (dummy data)</>
      case LocationDataType.BOUNDARY:
        // code to return boundary name
        return <>Unitary Authority (dummy data)</>
    }
  }

  const locationDetails = (
    <div
      style={
        comparedLocation &&
        ((!isShapeFile && comparedAdditionalData?.full_address === null) ||
          (isShapeFile &&
            comparedLocation?.geometry?.geoJson?.properties?.Shape_Area === null))
          ? compareStyle
          : {}
      }
    >
      <div
        className={
          (!isShapeFile && additionalData?.full_address) ||
          (isShapeFile && location?.geoJson?.geometry?.properties?.Shape_Area)
            ? sectionClassName
            : 'govuk-!-padding-left-4 govuk-!-padding-right-4'
        }
      >
        <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-margin-top-3 govuk-!-display-inline-block'>
          Location
        </h2>
        <hr
          style={{ height: '2px', color: '#000', opacity: '1' }}
          className='govuk-!-margin-top-1 govuk-!-margin-bottom-3'
        />
        <h3
          className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-top-1 govuk-!-margin-bottom-0'
          style={
            comparedLocation &&
            comparedAdditionalData?.location_data_type !==
              additionalData?.location_data_type
              ? compareStyle
              : {}
          }
        >
          {LocationHeader()}
        </h3>
        <p className='govuk-!-margin-top-1'>{LocationData()}</p>
      </div>
    </div>
  )

  return (
    <>
      <main className='govuk-body'>
        {/* map */}
        <div>
          <Map
            showMapControls={false}
            zoomLevel={14}
            manualCoords={location.coordinates}
          />
          <div>
            <FloodWarningKey type='both' />
          </div>
          <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-padding-left-4 govuk-!-margin-top-4'>
            This is not a live flood map
          </span>
          <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-padding-left-4 govuk-!-margin-bottom-4'>
            It shows fixed areas we provide flood warnings and alerts for.
          </span>
        </div>

        {/* details */}
        <div>
          {/* Address details */}
          {additionalData?.full_address && (
            <div
              className='govuk-!-padding-left-4 govuk-!-padding-right-4'
              style={addressAdded ? compareStyle : {}}
            >
              <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-margin-top-3 govuk-!-display-inline-block'>
                Address
              </h2>
              <hr
                style={{ height: '2px', color: '#000', opacity: '1' }}
                className='govuk-!-margin-top-1 govuk-!-margin-bottom-3'
              />
              <p>
                {formattedAddress.map((line, index) => {
                  return (
                    <span
                      key={index}
                      style={
                        !addressAdded &&
                        comparedLocation &&
                        comparedFormattedAddress[index] !==
                          formattedAddress[index]
                          ? compareStyle
                          : {}
                      }
                    >
                      {line}
                      <br />
                    </span>
                  )
                })}
              </p>
            </div>
          )}
          {/* Location details */}
          {locationDetails}
          {/* Key Information details */}
          {additionalData?.location_data_type !== LocationDataType.BOUNDARY && (
            <div className={sectionClassName}>
              <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-margin-top-3 govuk-!-display-inline-block'>
                Key Information
              </h2>
              <hr
                style={{ height: '2px', color: '#000', opacity: '1' }}
                className='govuk-!-margin-top-1 govuk-!-margin-bottom-3'
              />
              <div style={locationNameAdded ? compareStyle : {}}>
                <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                  Location name
                </h3>
                <p
                  style={
                    !locationNameAdded &&
                    comparedLocation &&
                    comparedLocation?.additionals?.locationName !==
                      location?.additionals?.locationName
                      ? compareStyle
                      : {}
                  }
                >
                  {location?.additionals?.locationName}
                </p>
              </div>
              {additionalData?.internal_reference && (
                <div style={internalReferenceAdded ? compareStyle : {}}>
                  <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                    Internal reference
                  </h3>
                  <p
                    style={
                      !internalReferenceAdded &&
                      comparedLocation &&
                      comparedAdditionalData?.internal_reference !==
                        additionalData?.internal_reference
                        ? compareStyle
                        : {}
                    }
                  >
                    {additionalData?.internal_reference}
                  </p>
                </div>
              )}
              {additionalData?.business_criticality && (
                <div style={businessCriticalityAdded ? compareStyle : {}}>
                  <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                    Business criticality
                  </h3>
                  <p
                    style={
                      !businessCriticalityAdded &&
                      comparedLocation &&
                      comparedAdditionalData?.business_criticality !==
                        additionalData?.business_criticality
                        ? compareStyle
                        : {}
                    }
                  >
                    {additionalData?.business_criticality}
                  </p>
                </div>
              )}
              {additionalData?.location_type && (
                <div style={locationTypeAdded ? compareStyle : {}}>
                  <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                    Location type
                  </h3>
                  <p
                    style={
                      !locationTypeAdded &&
                      comparedLocation &&
                      comparedAdditionalData?.location_type !==
                        additionalData?.location_type
                        ? compareStyle
                        : {}
                    }
                  >
                    {additionalData?.location_type}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Keywords details */}
          {location?.additionals?.keywords.length > 0 && (
            <div
              className={sectionClassName}
              style={keywordsAdded ? compareStyle : {}}
            >
              <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-margin-top-3 govuk-!-display-inline-block'>
                Keywords
              </h2>
              <hr
                style={{ height: '2px', color: '#000', opacity: '1' }}
                className='govuk-!-margin-top-1 govuk-!-margin-bottom-3'
              />
              {location?.additionals?.keywords.map(
                (keyword, index, keywords) => {
                  return (
                    <span
                      key={index}
                      style={
                        !keywordsAdded &&
                        comparedLocation &&
                        !comparedLocation?.additionals?.keywords?.includes(
                          keyword
                        )
                          ? compareStyle
                          : {}
                      }
                    >
                      {keyword}
                      {index + 1 === keywords.length ? '' : ', '}
                    </span>
                  )
                }
              )}
            </div>
          )}

          {/* Action plan details */}
          {additionalData?.action_plan && (
            <div
              className={sectionClassName}
              style={actionPlanAdded ? compareStyle : {}}
            >
              <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-margin-top-3 govuk-!-display-inline-block'>
                Action Plan
              </h2>
              <hr
                style={{ height: '2px', color: '#000', opacity: '1' }}
                className='govuk-!-margin-top-1 govuk-!-margin-bottom-3'
              />
              <p
                style={
                  !actionPlanAdded &&
                  comparedLocation &&
                  comparedAdditionalData?.action_plan !==
                    additionalData?.action_plan
                    ? compareStyle
                    : {}
                }
              >
                {additionalData?.action_plan}
              </p>
            </div>
          )}

          {/* Notes details */}
          {additionalData?.notes && (
            <div
              className={sectionClassName}
              style={notesAdded ? compareStyle : {}}
            >
              <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-margin-top-3 govuk-!-display-inline-block'>
                Notes
              </h2>
              <hr
                style={{ height: '2px', color: '#000', opacity: '1' }}
                className='govuk-!-margin-top-1 govuk-!-margin-bottom-3'
              />
              <p
                style={
                  !notesAdded &&
                  comparedLocation &&
                  comparedAdditionalData?.notes !== additionalData?.notes
                    ? compareStyle
                    : {}
                }
              >
                {additionalData?.notes}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
