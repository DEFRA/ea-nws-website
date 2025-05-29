import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import FloodWarningKey from '../../../common/components/custom/FloodWarningKey'
import Map from '../../../common/components/custom/Map'
import Button from '../../../common/components/gov-uk/Button'
import InsetText from '../../../common/components/gov-uk/InsetText'
import AlertType from '../../../common/enums/AlertType'
import {
  setAdditionalAlerts,
  setProfile,
  setSelectedFloodAlertArea
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  addLocation,
  findPOIByAddress,
  getRegistrationParams,
  removeLocation,
  setLocationOtherAdditionals
} from '../../../common/services/ProfileServices'
import {
  getCoordsOfFloodArea,
  getFloodAreaByTaCode
} from '../../../common/services/WfsFloodDataService'

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
  const severeFloodWarningCount = useSelector(
    (state) => state.session.severeFloodWarningCount
  )

  // only used when user is going through nearby target areas flow
  const isUserInNearbyTargetFlowpath = useSelector(
    (state) => state.session.nearbyTargetAreaFlow
  )
  const selectedFloodWarningArea = useSelector(
    (state) => state.session.selectedFloodWarningArea
  )
  // address to use for registering and unregistering partner
  const addressToUse = isUserInNearbyTargetFlowpath
    ? selectedFloodWarningArea.properties.TA_Name
    : selectedLocation.address

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

    if (isUserInNearbyTargetFlowpath) {
      updatedProfile = await addFloodWarningArea()

      // load associated flood alert area
      await findAssociatedFloodAlertArea()
    } else {
      updatedProfile = await addLocationWithFloodWarningAlerts()
    }

    // we must always show user the optional flood alert areas
    dispatch(setAdditionalAlerts(true))

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

  const registerLocationToPartner = async (profile) => {
    const location = findPOIByAddress(profile, addressToUse)
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
    if (isUserInNearbyTargetFlowpath) {
      updatedProfile = await removeFloodWarningArea()
    } else {
      updatedProfile = await removeLocationWithFloodWarningAlerts()
    }

    dispatch(setAdditionalAlerts(false))

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

  const unregisterLocationFromPartner = async (updatedProfile) => {
    const location = findPOIByAddress(updatedProfile, addressToUse)

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

  const addFloodWarningArea = async () => {
    const warningArea = {
      name: '',
      address: selectedFloodWarningArea.properties.TA_Name,
      coordinates: getCoordsOfFloodArea(selectedFloodWarningArea),
      additionals: setLocationOtherAdditionals([], 'alertTypes', [
        AlertType.SEVERE_FLOOD_WARNING,
        AlertType.FLOOD_WARNING,
        AlertType.REMOVE_FLOOD_SEVERE_WARNING,
        AlertType.REMOVE_FLOOD_WARNING,
        AlertType.INFO
      ])
    }
    const updatedProfile = addLocation(profile, warningArea)
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const removeFloodWarningArea = async () => {
    const updatedProfile = removeLocation(
      profile,
      selectedFloodWarningArea.properties.TA_Name
    )
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const findAssociatedFloodAlertArea = async () => {
    const associatedAlertArea = await getFloodAreaByTaCode(
      selectedFloodWarningArea.properties.parenttacode
    )

    if (associatedAlertArea) {
      dispatch(setSelectedFloodAlertArea(associatedAlertArea))
    }
  }

  const addLocationWithFloodWarningAlerts = async () => {
    // geosafe doesnt accept locations with postcodes - need to remove this from the object
    const { postcode, ...locationWithoutPostcode } = selectedLocation
    // update location to recieve severe alert warnings
    const locationWithAlertType = {
      ...locationWithoutPostcode,
      additionals: setLocationOtherAdditionals([], 'alertTypes', [
        AlertType.SEVERE_FLOOD_WARNING,
        AlertType.FLOOD_WARNING,
        AlertType.REMOVE_FLOOD_SEVERE_WARNING,
        AlertType.REMOVE_FLOOD_WARNING,
        AlertType.INFO
      ])
    }

    const updatedProfile = addLocation(profile, locationWithAlertType)
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const removeLocationWithFloodWarningAlerts = async () => {
    const updatedProfile = removeLocation(profile, selectedLocation.address)
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
      <Helmet>
        <title>
          You can get severe flood warnings and flood warnings near this area -
          Get flood warnings - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={() => handleUserNavigatingBack()} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              You can get severe flood warnings and flood warnings for this
              location
            </h1>
            <InsetText
              text={
                isUserInNearbyTargetFlowpath
                  ? selectedFloodWarningArea.properties.TA_Name
                  : selectedLocation.address
              }
            />
          </div>
          <div className='govuk-grid-column-three-quarters'>
            <Map types={['severe']} />
            <FloodWarningKey type='severe' />
          </div>

          <div className='govuk-grid-column-two-thirds'>
            <p className='govuk-!-margin-top-6'>
              These warnings tell you when flooding:
            </p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>is expected</li>
              <li>could be a danger to life or property</li>
            </ul>
            <p>You'll need to act immediately.</p>
            <p>The following may be affected:</p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>life and communities</li>
              <li>homes and businesses</li>
              <li>roads, railway lines and infrastructure</li>
              <li>coastal areas affected by spray or waves overtopping</li>
              <li>flood plains, including caravan parks and campsites</li>
              <li>major tourist and leisure attractions</li>
            </ul>
            <p>
              Flood warnings are usually sent 30 minutes to 2 hours before
              flooding.
            </p>
            <p>
              Severe flood warnings will be sent at any time when life is at
              risk.
            </p>
            <p>
              Total sent in last year: <b>{severeFloodWarningCount || 0}</b>
            </p>
            <Button
              text='Confirm you want this location'
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
