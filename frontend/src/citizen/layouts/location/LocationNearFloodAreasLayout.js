import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import FloodMessagesTable from '../../../common/components/custom/FloodMessagesTable'
import Map from '../../../common/components/custom/Map'
import Button from '../../../common/components/gov-uk/Button'
import Details from '../../../common/components/gov-uk/Details'
import AlertType from '../../../common/enums/AlertType'
import {
  getLocationOtherAdditional,
  setProfile
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  addLocation,
  findPOIByAddress,
  getRegistrationParams,
  removeLocation
} from '../../../common/services/ProfileServices'

export default function LocationNearFloodAreasLayout({
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
  const locationAlertTypes = getLocationOtherAdditional(
    selectedLocation?.additionals,
    'alertTypes'
  )
  const [floodAreas, setFloodAreas] = useState([])
  const [severeWarningAreas, setSevereWarningAreas] = useState(new Set())
  const [alertAreas, setAlertAreas] = useState(new Set())
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

    // cycle through all areas selected

    updatedProfile = await addLocationWithinFloodArea()

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

    const updatedProfile = addLocation(profile, locationWithoutPostcode)
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const registerLocationToPartner = async (profile) => {
    const location = findPOIByAddress(profile, selectedLocation.address)

    const data = {
      authToken,
      locationId: location.id,
      partnerId,
      params: getRegistrationParams(profile, locationAlertTypes)
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

  useEffect(() => {
    let severeNames = new Set()
    let alertNames = new Set()
    floodAreas?.forEach((area) => {
      if (area.properties.category.toLowerCase().includes('warning')) {
        severeNames.add(area.properties.TA_Name)
      } else if (area.properties.category.toLowerCase().includes('alert')) {
        alertNames.add(area.properties.TA_Name)
      }
    })

    setSevereWarningAreaNames(severeNames)
    setAlertAreaNames(alertNames)
  }, [floodAreas])

  return (
    <>
      <BackLink onClick={() => handleUserNavigatingBack()} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>
              You can get flood messages for your location
            </h1>
            <Map types={mapAreas} setFloodAreas={setFloodAreas} />
            <p className='govuk-!-padding-top-6 govuk-!-padding-bottom-4'>
              We'll send you the following flood messages.
            </p>
            <FloodMessagesTable
              types={locationAlertTypes}
              severeFloodWarningAreaNames={severeWarningAreaNames}
              alertFloodWarningAreaNames={alertAreaNames}
            />
            <Details
              title={'Read more on the difference between warnings and alerts'}
              text={''}
            />
            <div className='govuk-!-margin-top-7'>
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
        </div>
      </main>
    </>
  )
}
