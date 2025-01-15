import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import Button from '../../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../../common/components/gov-uk/NotificationBanner'
import LocationDataType from '../../../../../../common/enums/LocationDataType'
import RiskAreaType from '../../../../../../common/enums/RiskAreaType'
import { getLocationAdditionals } from '../../../../../../common/redux/userSlice'
import RiskCategoryLabel from '../../../../../components/custom/RiskCategoryLabel'
import ViewLocationSubNavigation from './ViewLocationSubNavigation'

export default function LocationHeader ({ currentPage }) {
  const location = useLocation()
  const additionalData = useSelector((state) => getLocationAdditionals(state))
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const coordinates = useSelector(
    (state) => state.session.currentLocation.coordinates
  )

  return (
    <>
      {location.state && (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success'
          title='Success'
          text={location.state.successMessage}
        />
      )}
      <div className='govuk-grid-row'>
        <div className='govuk-grid-column-one-half'>
          <h1 className='govuk-heading-l'>{additionalData.locationName}</h1>
        </div>
        <div
          class='govuk-grid-column-one-half right'
          style={{
            marginLeft: 'auto',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            text='Delete location'
            className='govuk-button govuk-button--secondary'
          />
        </div>
      </div>

      {/* flood risk bannner */}
      {/* only show if data allows */}
      {(additionalData.location_data_type === LocationDataType.ADDRESS ||
        additionalData.location_data_type ===
          LocationDataType.X_AND_Y_COORDS) &&
        currentLocation.coordinates?.latitude &&
        currentLocation.coordinates?.longitude && (
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
                      coordinates={coordinates}
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
                      coordinates={coordinates}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}

      {/* view location navigation */}
      <div className='govuk-!-margin-top-6 govuk-!-margin-bottom-9'>
        <ViewLocationSubNavigation currentPage={currentPage} type='sub' />
      </div>
    </>
  )
}
