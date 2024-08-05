import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import FloodWarningKey from '../../../common/components/custom/FloodWarningKey'
import Map from '../../../common/components/custom/Map'
import Button from '../../../common/components/gov-uk/Button'
import CheckBox from '../../../common/components/gov-uk/CheckBox'
import InsetText from '../../../common/components/gov-uk/InsetText'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  addLocation,
  removeLocation,
  updateLocationsFloodCategory
} from '../../../common/services/ProfileServices'
import { getCoordsOfFloodArea } from '../../../common/services/WfsFloodDataService'

export default function LocationInAlertAreaLayout ({ continueToNextPage }) {
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
  // only used when user is going through nearby target areas flow
  const isUserInNearbyTargetFlowpath = useSelector(
    (state) => state.session.nearbyTargetAreaFlow
  )
  const selectedFloodAlertArea = useSelector(
    (state) => state.session.selectedFloodAlertArea
  )

  const handleSubmit = async () => {
    if (additionalAlerts && isChecked) {
      if (isUserInNearbyTargetFlowpath) {
        await addFloodAlertArea()
      } else {
        await updateExistingLocationCategories(['severe', 'alert'])
      }
    } else if (additionalAlerts && !isChecked) {
      // scenario where user has pressed back and un-checked to get notifications for alert areas
      if (isUserInNearbyTargetFlowpath) {
        await removeFloodAlertArea()
      } else {
        await updateExistingLocationCategories(['severe'])
      }
    } else {
      // location only has flood alerts availble or user has selected a nearby flood alert area
      if (isUserInNearbyTargetFlowpath) {
        await addFloodAlertArea()
      } else {
        await addLocationWithOnlyFloodAlerts()
      }
    }

    await updateGeosafeProfile()
    continueToNextPage()
  }

  // remove newly added location/location updates
  const handleUserNavigatingBack = async () => {
    if (additionalAlerts) {
      if (isUserInNearbyTargetFlowpath) {
        await removeFloodAlertArea()
      } else {
        await updateExistingLocationCategories(['severe'])
      }
    } else {
      // location only has flood alerts availble or user has selected a nearby flood alert area
      if (isUserInNearbyTargetFlowpath) {
        await removeFloodAlertArea()
      } else {
        await removeLocationWithOnlyFloodAlerts()
      }
    }

    await updateGeosafeProfile()
    navigate(-1)
  }

  const addFloodAlertArea = async () => {
    const alertArea = {
      name: selectedFloodAlertArea.properties.ta_name,
      address: '',
      coordinates: getCoordsOfFloodArea(selectedFloodAlertArea)
    }
    const updatedProfile = await addLocation(profile, alertArea)
    dispatch(setProfile(updatedProfile))
  }

  const removeFloodAlertArea = async () => {
    const updatedProfile = await removeLocation(
      profile,
      selectedFloodAlertArea.properties.ta_name
    )
    dispatch(setProfile(updatedProfile))
  }

  const addLocationWithOnlyFloodAlerts = async () => {
    const { postcode, ...locationWithoutPostcode } = selectedLocation

    const locationWithAlertType = {
      ...locationWithoutPostcode,
      categories: ['alert']
    }
    const updatedProfile = await addLocation(profile, locationWithAlertType)
    dispatch(setProfile(updatedProfile))
  }

  const removeLocationWithOnlyFloodAlerts = async () => {
    const updatedProfile = await removeLocation(profile, selectedLocation.name)
    dispatch(setProfile(updatedProfile))
  }

  const updateExistingLocationCategories = async (categories) => {
    const updatedProfile = await updateLocationsFloodCategory(
      profile,
      selectedLocation,
      categories
    )
    dispatch(setProfile(updatedProfile))
  }

  const updateGeosafeProfile = async () => {
    const dataToSend = { authToken, profile }
    await backendCall(dataToSend, 'api/profile/update', navigate)
  }

  return (
    <>
      <BackLink onClick={() => handleUserNavigatingBack()} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              {additionalAlerts
                ? 'You can also get flood alerts (optional)'
                : 'You can get flood alerts for this location'}
            </h1>
            <InsetText text={selectedLocation.name} />
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
            <p>The following may be at risk:</p>
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
                    >
                      Choose different location
                    </Link>
                  )}
                  {canCancel && (
                    <Link
                      className='govuk-link inline-link'
                      onClick={() => navigate(-1)}
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
