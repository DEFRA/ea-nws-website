import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import RiskAreaType from '../../../../../common/enums/RiskAreaType'
import RiskCategoryLabel from '../../../../components/custom/RiskCategoryLabel'
import ViewLocationSubNavigation from '../../../../layouts/location/view/view-location-information/location-information-components/ViewLocationSubNavigation'

export default function LocationInformationLayout () {
  const navigate = useNavigate()
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const additionalData = currentLocation.meta_data.location_additional
  const formattedAddress = currentLocation.address?.split(',')

  const LocationHeader = () => {
    switch (additionalData.location_data_type) {
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

  const LocationData = () => {
    switch (additionalData.location_data_type) {
      case LocationDataType.ADDRESS:
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

  const locationDetails = (
    <>
      <div className={currentLocation.address ? 'govuk-!-margin-top-7' : ''}>
        <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
          Message settings
        </h2>
        <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
        <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-top-1 govuk-!-margin-bottom-0'>
          {LocationHeader()}
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
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-4'>
        <div class='govuk-grid-row'>
          <div class='govuk-grid-column-full'>
            <span class='govuk-caption-l'>View location</span>
            <h1 class='govuk-heading-l'>{additionalData.location_name}</h1>
          </div>
        </div>

        {/* flood risk bannner */}
        {(additionalData.location_data_type === LocationDataType.ADDRESS ||
          additionalData.location_data_type ===
            LocationDataType.X_AND_Y_COORDS) && (
              <div class='govuk-grid-row'>
                <div className='govuk-grid-column-full'>
                  <div className='flood-risk-banner govuk-!-margin-top-2'>
                    <div className='flood-risk-banner-item govuk-!-padding-2'>
                      <h3 className='flood-risk-banner-title govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                        {RiskAreaType.RIVERS_AND_SEA}
                      </h3>
                      <div className='flood-risk-banner-label '>
                        <RiskCategoryLabel
                          riskAreaType={RiskAreaType.RIVERS_AND_SEA}
                        />
                      </div>
                    </div>
                    <div className='flood-risk-banner-item'>
                      <h3 className='flood-risk-banner-title govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                        {RiskAreaType.GROUNDWATER}
                      </h3>
                      <div className='flood-risk-banner-label '>
                        <RiskCategoryLabel
                          riskAreaType={RiskAreaType.GROUNDWATER}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        )}

        {/* view location navigation */}
        <div className='govuk-!-margin-top-6 govuk-!-margin-bottom-9'>
          <ViewLocationSubNavigation currentPage='/location/view-location' />
        </div>

        {/* details */}
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {/* Address details */}
            {currentLocation.address && (
              <>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Flood areas
                </h2>
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
          </div>
        </div>
      </main>
    </>
  )
}
