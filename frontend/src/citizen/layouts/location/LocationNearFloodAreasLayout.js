import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Map from '../../../common/components/custom/Map'
import Button from '../../../common/components/gov-uk/Button'
import Checkbox from '../../../common/components/gov-uk/CheckBox'
import Details from '../../../common/components/gov-uk/Details'
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
import { getSurroundingFloodAreas } from '../../../common/services/WfsFloodDataService'

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
  const { latitude, longitude } = selectedLocation.coordinates
  const locationAlertTypes = getLocationOtherAdditional(
    selectedLocation?.additionals,
    'alertTypes'
  )
  const [floodAreas, setFloodAreas] = useState([])
  const [partnerId, setPartnerId] = useState(false)

  // used when user has selected search via placename and radius of TAs found is extended
  const locationSearchType = useSelector(
    (state) => state.session.locationSearchType
  )
  // used when user selects flood area when location is within proximity
  const isUserInNearbyTargetFlowpath = useSelector(
    (state) => state.session.nearbyTargetAreaFlow
  )

  // get nearby flood areas to setup map
  useEffect(() => {
    async function fetchFloodAreaData() {
      let areas = []
      const { alertArea, warningArea } = await getSurroundingFloodAreas(
        latitude,
        longitude,
        !isUserInNearbyTargetFlowpath
          ? // only load TAs required i.e if location being added lies within TAs, then only load these by searching with a 1m radius
            // this can be repeated for locations that were added as a TA as well
            0.001
          : // extend the radius of TAs loaded on map when user has searched via placename
          locationSearchType === 'placename'
          ? 1.5
          : 0.5
      )

      areas.push(...warningArea.features)
      areas.push(...alertArea.features)
      setFloodAreas(areas)
    }
    fetchFloodAreaData()
  }, [])

  console.log('flood areas', floodAreas)

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

    // updatedProfile = await removeLocationWithinFloodArea()

    // if (updateGeoSafeProfile) {
    //   updatedProfile = await updateGeosafeProfile(profile)
    //   // if user is in sign up flow, then profile returned will be undefined
    //   if (updatedProfile) {
    //     unregisterLocationFromPartner(updatedProfile)
    //     dispatch(setProfile(updatedProfile))
    //   }
    // }

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

  // again need to update here to use enum
  const getFloodAreaType = (category) => {
    if (category.toLowerCase().includes('warning')) {
      return ['severe']
    } else if (category.toLowerCase().includes('alert')) {
      return ['alert']
    }
  }

  const getFloodAreaMessages = (category) => {
    if (category.toLowerCase().includes('warning')) {
      return (
        <ul class='govuk-list govuk-list--bullet'>
          <li>severe flood warnings</li>
          <li>flood warnings</li>
        </ul>
      )
    } else if (category.toLowerCase().includes('alert')) {
      return (
        <ul class='govuk-list govuk-list--bullet'>
          <li>flood alerts</li>
        </ul>
      )
    }
  }

  return (
    <>
      <BackLink onClick={() => handleUserNavigatingBack()} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>
              Select nearby areas where you can get flood messages
            </h1>
            <p>Shakir to add types of flood message key here</p>
            <Details
              title={'Read more on the difference between warnings and alerts'}
              text={'Shakir to add details here'}
            />
            {floodAreas.map((area) => {
              return (
                <>
                  <div class='govuk-summary-card'>
                    <div class='govuk-summary-card__title-wrapper'>
                      <Checkbox label='Select' style={{ fontWeight: 'bold' }} />{' '}
                    </div>
                    <div class='govuk-summary-card__content govuk-grid-row'>
                      <div class='govuk-grid-column-one-half '>
                        <h3 class='govuk-heading-s'>
                          {' '}
                          {area.properties.TA_Name}
                        </h3>
                        <p>Messages you'll get:</p>
                        {getFloodAreaMessages(area?.properties?.category)}
                      </div>
                      <div class='govuk-grid-column-one-half'>
                        <Map
                          selectedFloodArea={area}
                          types={getFloodAreaType(area?.properties?.category)}
                          interactive={false}
                          fullScreenOption={true}
                        />
                      </div>
                    </div>
                    <br />
                  </div>
                </>
              )
            })}
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
                Enter different location
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
