import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import FloodMessageDetails from '../../../common/components/custom/FloodMessageDetails'
import FloodMessagesTypes from '../../../common/components/custom/FloodMessagesTypes'
import Map from '../../../common/components/custom/Map'
import Button from '../../../common/components/gov-uk/Button'
import Checkbox from '../../../common/components/gov-uk/CheckBox'
import Details from '../../../common/components/gov-uk/Details'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import AlertType from '../../../common/enums/AlertType'
import {
  getAdditional,
  setNearbyTargetAreasAdded,
  setProfile
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  addLocation,
  findPOIByAddress,
  getRegistrationParams,
  removeLocation
} from '../../../common/services/ProfileServices'
import {
  getCoordsOfFloodArea,
  getSurroundingFloodAreas
} from '../../../common/services/WfsFloodDataService'

export default function LocationNearFloodAreasLayout({
  continueToNextPage,
  searchResultsPage,
  updateGeoSafeProfile = true
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const { latitude, longitude } = selectedLocation.coordinates
  const [floodAreas, setFloodAreas] = useState([])
  const [partnerId, setPartnerId] = useState(false)
  const [error, setError] = useState(null)
  const [showFullMap, setShowFullMap] = useState(false)
  const [selectedArea, setSelectedArea] = useState(null)
  const inSignUpFlow = location.pathname.includes('signup')

  // used when user has selected search via placename and radius of TAs found is extended
  const locationSearchType = useSelector(
    (state) => state.session.locationSearchType
  )
  // used when user selects flood area when location is within proximity
  const isUserInNearbyTargetFlowpath = useSelector(
    (state) => state.session.nearbyTargetAreaFlow
  )
  // used when user decides to navigate back right after
  const floodAreasRecentlyAdded = useSelector(
    (state) => state.session.nearbyTargetAreasAdded
  )
  // these are flood areas already on the users profile - prevents duplicates
  const floodAreasAlreadyAdded = useSelector(
    (state) => state.session.floodAreasAlreadyAdded
  )

  // get nearby flood areas to setup map
  useEffect(() => {
    async function fetchFloodAreaData() {
      let { alertArea, warningArea } = await getSurroundingFloodAreas(
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

      // Combine area lists
      const alreadySelected = new Set([
        ...floodAreasAlreadyAdded,
        ...floodAreasRecentlyAdded
      ])
      const allAreas = [...warningArea.features, ...alertArea.features].map(
        (area) => ({
          ...area,
          addLocation: alreadySelected.has(area.properties.TA_Name)
        })
      )

      if (!inSignUpFlow) {
        // remove the choice of picking any
        const filteredAreas = allAreas.filter(
          (area) => !floodAreasAlreadyAdded.includes(area?.properties?.TA_Name)
        )
        setFloodAreas(filteredAreas)
      } else {
        setFloodAreas(allAreas)
      }
    }
    fetchFloodAreaData()
  }, [])

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

    const minimumAreasAdded = floodAreas.some((area) => {
      return area.addLocation
    })

    if (minimumAreasAdded) {
      updatedProfile = await addFloodAreas()

      // need a function which checks the un-ticked options and removes them from the profile

      if (updateGeoSafeProfile) {
        updatedProfile = await updateGeosafeProfile(updatedProfile)

        // if user is in sign up flow, then profile returned will be undefined
        if (updatedProfile) {
          await registerLocationsToPartner(updatedProfile)
          dispatch(setProfile(updatedProfile))
        }
      }

      continueToNextPage(updatedProfile)
    } else {
      setError('Select at least one area')
    }
  }

  const addFloodAreas = async () => {
    let updatedProfile = { ...profile }
    // we need to get a common name to group nearby target area locations added through an address
    const locationName = selectedLocation.address

    // We must check what has already been added to prevent duplicates
    // (in the case of a user navigating back)
    const alreadyAdded = new Set([
      ...floodAreasAlreadyAdded,
      ...floodAreasRecentlyAdded
    ])
    const toAdd = floodAreas.filter(
      (area) => area.addLocation && !alreadyAdded.has(area?.properties?.TA_Name)
    )

    const floodAreasAdded = toAdd.map((area) => area.properties.TA_Name)

    for (const area of toAdd) {
      const additionals = [
        { id: 'locationName', value: { s: locationName } },
        {
          id: 'other',
          value: {
            s: JSON.stringify({
              alertTypes: getAreasAlertMessageTypes(area.properties.category)
            })
          }
        }
      ]

      const targetArea = {
        name: '',
        address: area.properties.TA_Name,
        coordinates: getCoordsOfFloodArea(area),
        additionals: additionals
      }

      updatedProfile = addLocation(updatedProfile, targetArea)
    }

    dispatch(setNearbyTargetAreasAdded(floodAreasAdded))
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const getAreasAlertMessageTypes = (category) => {
    if (category.toLowerCase().includes('warning')) {
      return [
        AlertType.SEVERE_FLOOD_WARNING,
        AlertType.FLOOD_WARNING,
        AlertType.REMOVE_FLOOD_SEVERE_WARNING,
        AlertType.REMOVE_FLOOD_WARNING,
        AlertType.INFO
      ]
    } else if (category.toLowerCase().includes('alert')) {
      return [AlertType.FLOOD_ALERT, AlertType.INFO]
    }
  }

  const registerLocationsToPartner = async (profile) => {
    floodAreas.forEach(async (area) => {
      if (area.addLocation) {
        const location = findPOIByAddress(profile, area?.properties.TA_Name)
        const locationAlertTypes = getAreasAlertMessageTypes(area?.properties.category)

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
    })
  }

  const handleUserNavigatingBack = async () => {
    let updatedProfile
    updatedProfile = await removeAllFloodAreas()

    if (updateGeoSafeProfile) {
      updatedProfile = await updateGeosafeProfile(profile)
      // if user is in sign up flow, then profile returned will be undefined
      if (updatedProfile) {
        unregisterLocationsFromPartner(updatedProfile)
        dispatch(setProfile(updatedProfile))
      }
    }

    navigate(-1)
  }

  const removeAllFloodAreas = async () => {
    let updatedProfile
    if (floodAreasRecentlyAdded?.length > 0) {
      floodAreasRecentlyAdded.forEach((areaName) => {
        updatedProfile = removeLocation(profile, areaName)
      })
    }

    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const unregisterLocationsFromPartner = async (updatedProfile) => {
    if (floodAreasRecentlyAdded?.length > 0) {
      floodAreasRecentlyAdded.forEach(async (areaName) => {
        const location = findPOIByAddress(updatedProfile, areaName)

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
      })
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

  const getFloodAreaDetails = (category) => {
    if (category.toLowerCase().includes('warning')) {
      return {
        type: [AlertType.FLOOD_WARNING],
        icon: 'warning',
        areaCategory: 'Severe flood warnings and flood warnings area',
        messages: (
          <ul class='govuk-list govuk-list--bullet'>
            <li>severe flood warnings</li>
            <li>flood warnings</li>
          </ul>
        )
      }
    } else if (category.toLowerCase().includes('alert')) {
      return {
        type: [AlertType.FLOOD_ALERT],
        icon: 'alert',
        areaCategory: 'flood alerts area',
        messages: (
          <ul class='govuk-list govuk-list--bullet'>
            <li>flood alerts</li>
          </ul>
        )
      }
    }
  }

  const floodAreaExistsInProfile = (area) => {
    const locations = profile.pois

    const floodAreaAdded = locations.some((location) => {
      return (
        location.address === area.properties.TA_Name &&
        getAdditional(location.additionals, 'locationName') ===
          selectedLocation.address
      )
    })

    return floodAreaAdded
  }

  const toggleFullScreen = () => {
    setShowFullMap(!showFullMap)
  }

  const setUpFullScreenMap = (area) => {
    setSelectedArea(area)
    toggleFullScreen()
  }

  const map = (area) => (
    <>
      <div
        className={`nearby-flood-areas-map ${isMobile ? 'mobile' : 'desktop'}`}
      >
        <Map
          selectedFloodArea={area}
          types={getFloodAreaDetails(area?.properties?.category).type}
          interactive={false}
          fullScreen={() => setUpFullScreenMap(area)}
          zoomLevel={locationSearchType === 'placename' ? 13 : 14}
        />
      </div>
    </>
  )

  const areaInfo = (area) => (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px'
        }}
      >
        <div
          className={`org-flood-warning-square ${
            getFloodAreaDetails(area?.properties?.category).icon
          }-square left`}
        />
        <h3 class='govuk-heading-s'>{area.properties.TA_Name}</h3>
      </div>
      <p>Messages you'll get:</p>
      {getFloodAreaDetails(area?.properties?.category).messages}
    </>
  )

  const fullScreenMap = () => (
    <div className='nearby-flood-areas-full-screen-map-container'>
      <div className={isMobile ? 'map-mobile' : 'map-desktop'}>
        <Map
          selectedFloodArea={selectedArea}
          highlightSelectedFloodArea={true}
          types={getFloodAreaDetails(selectedArea.properties?.category).type}
          interactive={true}
          resetMapButton={!isMobile}
          exitMap={() => toggleFullScreen()}
        />
      </div>

      <div className={isMobile ? 'area-info-mobile' : 'area-info-desktop'}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}
        >
          <div
            className={`org-flood-warning-square ${
              getFloodAreaDetails(selectedArea?.properties?.category).icon
            }-square left`}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p className='govuk-body govuk-!-font-size-16 govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2'>
              {selectedArea.properties.TA_Name}
            </p>
            <p className='govuk-body govuk-!-font-size-16'>
              {
                getFloodAreaDetails(selectedArea?.properties?.category)
                  .areaCategory
              }
            </p>
          </div>
        </div>

        <Button
          text='Select this location'
          className={`govuk-button ${isMobile && 'custom-width-button'}`}
          onClick={() => {
            toggleFullScreen()
            setFloodAreas((prevAreas) =>
              prevAreas.map((a) =>
                a.id === selectedArea.id
                  ? { ...a, addLocation: !a.addLocation }
                  : a
              )
            )
          }}
        />
      </div>
    </div>
  )

  return (
    <>
      {showFullMap ? (
        fullScreenMap()
      ) : (
        <>
          <BackLink onClick={() => handleUserNavigatingBack()} />
          <main className='govuk-main-wrapper govuk-!-padding-top-8'>
            <div className='govuk-grid-row govuk-body'>
              {error && <ErrorSummary errorList={[error]} />}
              <div className='govuk-grid-column-full'>
                <h1 className='govuk-heading-l'>
                  Select nearby areas where you can get flood messages
                </h1>
                <div>
                  <FloodMessagesTypes />
                </div>
                {!isMobile && (
                  <Details
                    title={
                      'Read more on the difference between warnings and alerts'
                    }
                    text={<FloodMessageDetails />}
                  />
                )}
                <div
                  className={`govuk-form-group ${
                    error && 'govuk-form-group--error'
                  }`}
                >
                  {error && <p class='govuk-error-message'>{error}</p>}
                  {floodAreas.map((area) => {
                    return (
                      <>
                        <div class='govuk-summary-card' key={area.id}>
                          <div class='govuk-summary-card__title-wrapper'>
                            <Checkbox
                              label='Select'
                              style={{ fontWeight: 'bold' }}
                              checked={!!area.addLocation}
                              onChange={() => {
                                setError(null)
                                setFloodAreas((prevAreas) =>
                                  prevAreas.map((a) =>
                                    a.id === area.id
                                      ? { ...a, addLocation: !a.addLocation }
                                      : a
                                  )
                                )
                              }}
                            />
                          </div>
                          <div class='govuk-summary-card__content govuk-grid-row'>
                            <div class='govuk-grid-column-one-half'>
                              {isMobile ? map(area) : areaInfo(area)}
                            </div>
                            <div class='govuk-grid-column-one-half'>
                              {isMobile ? (
                                <div className='govuk-!-padding-top-4'>
                                  {areaInfo(area)}
                                </div>
                              ) : (
                                map(area)
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
                {isMobile && (
                  <Details
                    title={
                      'Read more on the difference between warnings and alerts'
                    }
                    text={'Shakir to add details here'}
                  />
                )}
                <div className='govuk-!-margin-top-7'>
                  <Button
                    text='I want these'
                    className={`govuk-button ${
                      isMobile && 'custom-width-button'
                    }`}
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
