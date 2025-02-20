import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import Popup from '../../../../../../common/components/custom/Popup'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import NotificationBanner from '../../../../../../common/components/gov-uk/NotificationBanner'
import LocationDataType from '../../../../../../common/enums/LocationDataType'
import RiskAreaType from '../../../../../../common/enums/RiskAreaType'
import { getLocationAdditionals } from '../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../common/services/BackendService'
import RiskCategoryLabel from '../../../../../components/custom/RiskCategoryLabel'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'
import ViewLocationSubNavigation from './ViewLocationSubNavigation'

export default function LocationHeader ({ currentPage }) {
  const navigate = useNavigate()
  const location = useLocation()
  const additionalData = useSelector((state) => getLocationAdditionals(state))
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const coordinates = useSelector(
    (state) => state.session.currentLocation.coordinates
  )
  const locationId = useSelector((state) => state.session.currentLocation.id)
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const [showPopup, setShowPopup] = useState(false)
  const [error, setError] = useState(false)

  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId () {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  const handleDelete = async () => {
    const unregisterData = {
      authToken,
      locationId: locationId,
      partnerId
    }

    await backendCall(
      unregisterData,
      'api/location/unregister_from_partner',
      navigate
    )

    const locationIds = [locationId]
    const dataToSend = { authToken, orgId, locationIds }

    const { errorMessage } = await backendCall(
      dataToSend,
      'api/location/remove',
      navigate
    )

    if (!errorMessage) {
      navigate(orgManageLocationsUrls.view.dashboard, {
        state: {
          successMessage: `${additionalData.locationName} deleted`
        }
      })
    } else {
      setError(errorMessage)
    }
  }

  return (
    <>
      {location.state && (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success'
          title='Success'
          text={location.state.successMessage}
        />
      )}
      {error && <ErrorSummary errorList={[error]} />}
      <div className='govuk-grid-row'>
        <div className='govuk-grid-column-one-half'>
          <h1 className='govuk-heading-l'>{additionalData.locationName}</h1>
        </div>
        <div
          className='govuk-grid-column-one-half right'
          style={{
            marginLeft: 'auto',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            text='Delete location'
            className='govuk-button govuk-button--secondary'
            onClick={() => setShowPopup(true)}
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
          <div className='govuk-grid-row'>
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

      {showPopup && (
        <>
          <Popup
            onDelete={() => handleDelete()}
            onClose={() => setShowPopup(false)}
            title='Delete location'
            popupText={
              <>
                If you continue {additionalData.locationName} will be deleted
                from this account and will not get flood messages.
              </>
            }
            buttonText='Delete location'
            buttonClass='govuk-button--warning'
          />
        </>
      )}
    </>
  )
}
