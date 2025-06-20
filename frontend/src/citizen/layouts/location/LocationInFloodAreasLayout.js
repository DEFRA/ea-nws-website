import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import FloodMessageDetails from '../../../common/components/custom/FloodMessageDetails'
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
import { getSurroundingFloodAreas } from '../../../common/services/WfsFloodDataService'

export default function LocationInFloodAreasLayout({
  continueToNextPage,
  searchResultsPage,
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
  const [severeWarningAreas, setSevereWarningAreas] = useState(new Set())
  const [alertAreas, setAlertAreas] = useState(new Set())

  // used when user has selected search via placename and radius of TAs found is extended
  const locationSearchType = useSelector(
    (state) => state.session.locationSearchType
  )

  // we should update this so that it is based on the enum value
  const mapAreas = locationAlertTypes.includes(AlertType.SEVERE_FLOOD_WARNING)
    ? [AlertType.FLOOD_WARNING, AlertType.FLOOD_ALERT]
    : [AlertType.FLOOD_ALERT]
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

  const addLocationWithinFloodArea = async () => {
    let updatedProfile = { ...profile }
    // geosafe doesnt accept locations with postcodes - need to remove this from the object
    const { postcode, ...locationWithoutPostcode } = selectedLocation

    const severeAreasArray = [...severeWarningAreas]
    const alertAreasArray = [...alertAreas]

    const allAreasAffectingLocation = severeAreasArray.concat(alertAreasArray)

    const additionals = [
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            targetAreas: allAreasAffectingLocation,
            alertTypes: locationAlertTypes
          })
        }
      }
    ]

    locationWithoutPostcode.additionals = additionals

    updatedProfile = addLocation(updatedProfile, locationWithoutPostcode)
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

  // load flood areas that the user will receive
  useEffect(() => {
    async function fetchFloodAreasAffectingLocation() {
      let floodAreas = []
      let severeAreas = []
      let alertAreas = []
      const { alertArea, warningArea } = await getSurroundingFloodAreas(
        latitude,
        longitude,
        0.001
      )

      floodAreas.push(...alertArea?.features)
      floodAreas.push(...warningArea?.features)

      floodAreas?.forEach((area) => {
        const category = area?.properties?.category?.toLowerCase()
        if (!category) return

        const areaData = {
          TA_CODE: area.properties.TA_CODE,
          TA_Name: area.properties.TA_Name,
          category: category.includes('warning')
            ? 'Flood warning'
            : 'Flood alert'
        }

        if (category.toLowerCase().includes('warning')) {
          severeAreas.push(areaData)
        } else if (category.toLowerCase().includes('alert')) {
          alertAreas.push(areaData)
        }
      })

      setSevereWarningAreas(severeAreas)
      setAlertAreas(alertAreas)
    }
    fetchFloodAreasAffectingLocation()
  }, [])

  const [showFullMap, setShowFullMap] = useState(false)

  const toggleFullScreen = () => {
    setShowFullMap(!showFullMap)
  }

  return (
    <>
      {showFullMap ? (
        <div className='location-in-flood-area--full-screen-map'>
          <Map
            types={mapAreas}
            interactive={true}
            exitMap={() => toggleFullScreen()}
          />
        </div>
      ) : (
        <>
          <BackLink onClick={() => handleUserNavigatingBack()} />
          <main className='govuk-main-wrapper govuk-!-padding-top-8'>
            <div className='govuk-grid-row govuk-body'>
              <div className='govuk-grid-column-full'>
                <h1 className='govuk-heading-l'>
                  You can get flood messages for your location
                </h1>
                <div
                  className={
                    isMobile
                      ? 'location-in-flood-area-map mobile'
                      : 'location-in-flood-area-map desktop'
                  }
                >
                  <Map
                    types={mapAreas}
                    interactive={!isMobile}
                    resetMapButton={!isMobile}
                    fullScreen={isMobile ? () => toggleFullScreen() : undefined}
                    zoomLevel={locationSearchType === 'placename' ? 13 : 14}
                  />
                </div>
                <p className='govuk-!-padding-top-6 govuk-!-padding-bottom-4'>
                  We'll send you the following flood messages.
                </p>
                <FloodMessagesTable
                  types={locationAlertTypes}
                  severeFloodWarningAreas={severeWarningAreas}
                  alertFloodWarningAreas={alertAreas}
                />
                <Details
                  title={
                    'Read more on the difference between warnings and alerts'
                  }
                  text={<FloodMessageDetails />}
                />
                <div className='govuk-!-margin-top-7'>
                  <Button
                    text='I want these'
                    className='govuk-button'
                    onClick={handleSubmit}
                  />
                  &nbsp; &nbsp;
                  <Link
                    to={searchResultsPage}
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
      )}
    </>
  )
}
