import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import FloodWarningKey from '../../../common/components/custom/FloodWarningKey'
import Map from '../../../common/components/custom/Map'
import Button from '../../../common/components/gov-uk/Button'
import CheckBox from '../../../common/components/gov-uk/CheckBox'
import InsetText from '../../../common/components/gov-uk/InsetText'
import AlertType from '../../../common/enums/AlertType'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  addLocation,
  findPOIByAddress,
  getRegistrationParams,
  removeLocation,
  setLocationOtherAdditionals,
  updateLocationsAlertTypes
} from '../../../common/services/ProfileServices'
import { getCoordsOfFloodArea } from '../../../common/services/WfsFloodDataService'

export default function LocationInAlertAreaLayout ({
  continueToNextPage,
  continueToSearchResultsPage,
  canCancel,
  updateGeoSafeProfile = true
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false)
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const additionalAlerts = useSelector(
    (state) => state.session.additionalAlerts
  )
  const floodAlertCount = useSelector((state) => state.session.floodAlertCount)
  // only used when user is going through nearby target areas flow
  const isUserInNearbyTargetFlowpath = useSelector(
    (state) => state.session.nearbyTargetAreaFlow
  )
  const selectedFloodAlertArea = useSelector(
    (state) => state.session.selectedFloodAlertArea
  )
  // address to use for registering and unregistering partner
  const addressToUse = isUserInNearbyTargetFlowpath
    ? selectedFloodAlertArea.properties.TA_Name
    : selectedLocation.address

  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId () {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    let updatedProfile

    if (additionalAlerts && isChecked) {
      if (isUserInNearbyTargetFlowpath) {
        updatedProfile = await addFloodAlertArea()
      } else {
        updatedProfile = await updateExistingLocationAlertTypes([
          AlertType.SEVERE_FLOOD_WARNING,
          AlertType.FLOOD_WARNING,
          AlertType.FLOOD_ALERT
        ])
      }
    } else if (additionalAlerts && !isChecked) {
      // scenario where user has pressed back and un-checked to get notifications for alert areas
      if (isUserInNearbyTargetFlowpath) {
        updatedProfile = await removeFloodAlertArea()
      } else {
        updatedProfile = await updateExistingLocationAlertTypes([
          AlertType.SEVERE_FLOOD_WARNING,
          AlertType.FLOOD_WARNING
        ])
      }
    } else {
      // location only has flood alerts availble or user has selected a nearby flood alert area
      if (isUserInNearbyTargetFlowpath) {
        updatedProfile = await addFloodAlertArea()
      } else {
        updatedProfile = await addLocationWithOnlyFloodAlerts()
      }
    }

    if (updateGeoSafeProfile) {
      updatedProfile = await updateGeosafeProfile(updatedProfile)

      // if user is in sign up flow, then profile returned will be undefined
      if (updatedProfile) {
        await registerLocationToPartner(updatedProfile)
        dispatch(setProfile(updatedProfile))
      }
    }

    continueToNextPage(updatedProfile)
  }

  const registerLocationToPartner = async (profile) => {
    const location = findPOIByAddress(profile, addressToUse)

    // accomodates additional alerts path incase user chooses not to select the additional alerts
    if (location) {
      let alertTypes = additionalAlerts
        ? [
            AlertType.SEVERE_FLOOD_WARNING,
            AlertType.FLOOD_WARNING,
            AlertType.FLOOD_ALERT
          ]
        : [AlertType.FLOOD_ALERT]

      if (isUserInNearbyTargetFlowpath) {
        alertTypes = [AlertType.FLOOD_ALERT]
      }

      const data = {
        authToken,
        locationId: location.id,
        partnerId,
        params: getRegistrationParams(profile, alertTypes)
      }

      const backendRoute = (additionalAlerts && !isUserInNearbyTargetFlowpath)
        ? 'api/partner/update_location_registration'
        : 'api/partner/register_location_to_partner'

      await backendCall(
        data,
        backendRoute,
        navigate
      )
    }
  }

  // remove newly added location/location updates
  const handleUserNavigatingBack = async () => {
    let updatedProfile

    if (additionalAlerts) {
      if (isUserInNearbyTargetFlowpath) {
        updatedProfile = await removeFloodAlertArea()
      } else {
        updatedProfile = await updateExistingLocationAlertTypes([
          AlertType.SEVERE_FLOOD_WARNING,
          AlertType.FLOOD_WARNING
        ])
      }
    } else {
      // location only has flood alerts availble or user has selected a nearby flood alert area
      if (isUserInNearbyTargetFlowpath) {
        updatedProfile = await removeFloodAlertArea()
      } else {
        updatedProfile = await removeLocationWithOnlyFloodAlerts()
      }
    }

    if (updateGeoSafeProfile) {
      updatedProfile = await updateGeosafeProfile(updatedProfile)
      // if user has added flood alert area, then we need to unregister from that
      if (isUserInNearbyTargetFlowpath && updatedProfile) {
        unregisterLocationFromPartner(updatedProfile)
        dispatch(setProfile(updatedProfile))
      }
    }

    navigate(-1)
  }

  const unregisterLocationFromPartner = async (updatedProfile) => {
    const location = findPOIByAddress(updatedProfile, addressToUse)

    if (location) {
      const data = {
        authToken,
        locationId: location.id,
        partnerId
      }

      await backendCall(
        data,
        'api/partner/unregister_location_from_partner',
        navigate
      )
    }
  }

  const addFloodAlertArea = async () => {
    const alertArea = {
      name: '',
      address: selectedFloodAlertArea.properties.TA_Name,
      coordinates: getCoordsOfFloodArea(selectedFloodAlertArea),
      additionals: setLocationOtherAdditionals([], 'alertTypes', [
        AlertType.FLOOD_ALERT
      ])
    }
    const updatedProfile = await addLocation(profile, alertArea)
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const removeFloodAlertArea = async () => {
    const updatedProfile = await removeLocation(
      profile,
      selectedFloodAlertArea.properties.TA_Name
    )
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const addLocationWithOnlyFloodAlerts = async () => {
    const { postcode, ...locationWithoutPostcode } = selectedLocation

    const locationWithAlertType = {
      ...locationWithoutPostcode,
      additionals: setLocationOtherAdditionals([], 'alertTypes', [
        AlertType.FLOOD_ALERT
      ])
    }
    const updatedProfile = await addLocation(profile, locationWithAlertType)
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const removeLocationWithOnlyFloodAlerts = async () => {
    const updatedProfile = await removeLocation(
      profile,
      selectedLocation.address
    )
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const updateExistingLocationAlertTypes = async (alertTypes) => {
    const updatedProfile = await updateLocationsAlertTypes(
      profile,
      selectedLocation,
      alertTypes
    )
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const updateGeosafeProfile = async (updatedProfile) => {
    const dataToSend = { authToken, profile: updatedProfile }
    const { data } = await backendCall(
      dataToSend,
      'api/profile/update',
      navigate
    )

    return data.profile
  }

  return (
    <>
      <BackLink onClick={() => handleUserNavigatingBack()} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              {additionalAlerts
                ? 'You can also get flood alerts (optional)'
                : 'You can get flood alerts for this location'}
            </h1>
            <InsetText
              text={
                isUserInNearbyTargetFlowpath
                  ? selectedFloodAlertArea.properties.TA_Name
                  : selectedLocation.address
              }
            />
          </div>
          <div className='govuk-grid-column-three-quarters'>
            <Map types={['alert']} />
            <FloodWarningKey type='alert' />
          </div>
          <div className='govuk-grid-column-two-thirds'>
            <p className='govuk-!-margin-top-6'>
              These are early alerts of possible flooding to help you be
              prepared.
            </p>
            <p>
              They tell you when you should prepare and could pose a risk to:
            </p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>fields, recreational land and car parks</li>
              <li>minor roads</li>
              <li>farmland</li>
              <li>coastal areas affected by spray or waves overtopping</li>
            </ul>
            <p>We usually send these:</p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>2 to 12 hours before flooding</li>
              <li>during waking hours when possible</li>
            </ul>
            <p>
              Total sent in last year: <b>{floodAlertCount || 0}</b>
            </p>
            {additionalAlerts && (
              <>
                <CheckBox
                  onChange={() => setIsChecked(!isChecked)}
                  checked={isChecked}
                  label='Yes, I want these'
                />
              </>
            )}
            <div className='govuk-!-margin-top-5'>
              <Button
                text={
                  additionalAlerts
                    ? 'Continue'
                    : 'Confirm you want this location'
                }
                className='govuk-button'
                onClick={handleSubmit}
              />
              {!additionalAlerts && (
                <Link
                  onClick={(e) => {
                    e.preventDefault()
                    continueToSearchResultsPage()
                  }}
                  className='govuk-link inline-link'
                  style={{ cursor: 'pointer' }}
                >
                  Choose different location
                </Link>
              )}
              {canCancel && (
                <Link
                  className='govuk-link inline-link'
                  onClick={() => navigate(-1)}
                  style={{ cursor: 'pointer' }}
                >
                  Cancel
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
