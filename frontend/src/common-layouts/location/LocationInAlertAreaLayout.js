import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FloodWarningKey from '../../custom-components/FloodWarningKey'
import Map from '../../custom-components/Map'
import Button from '../../gov-uk-components/Button'
import CheckBox from '../../gov-uk-components/CheckBox'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import {
  addLocation,
  removeLocation,
  updateLocationsFloodCategory
} from '../../services/ProfileServices'
import { getCoordsOfFloodArea } from '../../services/WfsFloodDataService'

export default function LocationInAlertAreaLayout ({
  continueToNextPage,
  continueToSearchResultsPage
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
        // TODO this doesnt work?
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

  const updateGeosafeProfile = async () => {
    const dataToSend = { authToken, profile }
    await backendCall(dataToSend, 'api/profile/update', navigate)
  }

  const addFloodAlertArea = async () => {
    const alertArea = {
      name: selectedFloodAlertArea.properties.ta_name,
      address: '',
      coordinates: getCoordsOfFloodArea(selectedFloodAlertArea)
    }
    await dispatch(setProfile(addLocation(profile, alertArea)))
  }

  const removeFloodAlertArea = async () => {
    await dispatch(
      setProfile(
        removeLocation(profile, selectedFloodAlertArea.properties.ta_name)
      )
    )
  }

  const addLocationWithOnlyFloodAlerts = async () => {
    const { postcode, ...locationWithoutPostcode } = selectedLocation

    const locationWithAlertType = {
      ...locationWithoutPostcode,
      categories: ['alert']
    }

    await dispatch(setProfile(addLocation(profile, locationWithAlertType)))
  }

  const updateExistingLocationCategories = async (categories) => {
    const updatedProfile = updateLocationsFloodCategory(
      profile,
      selectedLocation,
      categories
    )
    await dispatch(setProfile(updatedProfile))
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <div className='govuk-body'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <Link onClick={() => navigate(-1)} className='govuk-back-link'>
                  Back
                </Link>
                <h1 className='govuk-heading-l govuk-!-margin-top-6'>
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
                <Button
                  text={
                    additionalAlerts
                      ? 'Continue'
                      : 'Confirm you want this location'
                  }
                  className='govuk-button govuk-!-margin-top-5'
                  onClick={handleSubmit}
                />
                {!additionalAlerts && (
                  <Link
                    onClick={(e) => {
                      e.preventDefault()
                      continueToSearchResultsPage()
                    }}
                    className='govuk-body govuk-link inline-link'
                  >
                    Choose different location
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
