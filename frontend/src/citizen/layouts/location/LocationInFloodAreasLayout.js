import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import Details from '../../../common/components/gov-uk/Details'
import AlertType from '../../../common/enums/AlertType'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  addLocation,
  findPOIByAddress,
  getRegistrationParams,
  removeLocation,
  setLocationOtherAdditionals
} from '../../../common/services/ProfileServices'

export default function LocationInSevereWarningAreaLayout({
  continueToNextPage,
  updateGeoSafeProfile = true
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId() {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    let updatedProfile

    updatedProfile = await addLocationWithinFloodArea()
    updatedProfile = await updateGeosafeProfile(updatedProfile)

    if (updateGeoSafeProfile) {
      updatedProfile = await updateGeosafeProfile(updatedProfile)

      // if user is in sign up flow, then profile returned will be undefined
      if (updatedProfile) {
        await registerLocationToPartner(updatedProfile)
        dispatch(setProfile(updatedProfile))
      }
    }
    continueToNextPage()
  }

  const addLocationWithinFloodArea = async () => {
    // geosafe doesnt accept locations with postcodes - need to remove this from the object
    const { postcode, ...locationWithoutPostcode } = selectedLocation

    //need to add redux variables that checks if location is within both areas or just alert area
    //then need to choose what alerts based on this - still to update this
    const locationWithAlertTypes = {
      ...locationWithoutPostcode,
      additionals: setLocationOtherAdditionals([], 'alertTypes', [
        AlertType.SEVERE_FLOOD_WARNING,
        AlertType.FLOOD_WARNING,
        AlertType.REMOVE_FLOOD_SEVERE_WARNING,
        AlertType.REMOVE_FLOOD_WARNING,
        AlertType.INFO
      ])
    }

    const updatedProfile = addLocation(profile, locationWithAlertTypes)
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const registerLocationToPartner = async (profile) => {
    const location = findPOIByAddress(profile, selectedLocation.address)

    //similar here - need to check what alert types to use based on the new redux variable
    const alertTypes = [
      AlertType.SEVERE_FLOOD_WARNING,
      AlertType.FLOOD_WARNING,
      AlertType.REMOVE_FLOOD_SEVERE_WARNING,
      AlertType.REMOVE_FLOOD_WARNING,
      AlertType.INFO
    ]

    const data = {
      authToken,
      locationId: location.id,
      partnerId,
      params: getRegistrationParams(profile, alertTypes)
    }

    await backendCall(
      data,
      'api/partner/register_location_to_partner',
      navigate
    )
  }

  const handleUserNavigatingBack = async () => {
    let updatedProfile

    updatedProfile = await removeLocationWithinFloodArea()
    updatedProfile = await updateGeosafeProfile(profile)

    if (updateGeoSafeProfile) {
      updatedProfile = await updateGeosafeProfile(profile)
      // if user is in sign up flow, then profile returned will be undefined
      if (updatedProfile) {
        unregisterLocationFromPartner(updatedProfile)
        dispatch(setProfile(updatedProfile))
      }
    }

    navigate(-1)
  }

  const removeLocationWithinFloodArea = async () => {
    const updatedProfile = removeLocation(profile, selectedLocation.address)
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const unregisterLocationFromPartner = async (updatedProfile) => {
    const location = findPOIByAddress(updatedProfile, selectedLocation.address)

    // accomodates situation where user presses back before the location is stored in the profile
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
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>
              You can get flood messages for your location
            </h1>
            <p>map here</p>
            <p>We'll send you the following flood messages.</p>
            <p>flood key here - RONAN is doing this</p>
            <Details
              title={'Read more on the difference between warnings and alerts'}
              text={''}
            />
            <Button
              text='I want these'
              className='govuk-button'
              onClick={handleSubmit}
            />
            &nbsp; &nbsp;
            <Link
              onClick={() => navigate(-1)}
              className='govuk-link'
              style={{
                display: 'inline-block',
                padding: '8px 10px 7px',
                cursor: 'pointer'
              }}
            >
              Choose different location
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}