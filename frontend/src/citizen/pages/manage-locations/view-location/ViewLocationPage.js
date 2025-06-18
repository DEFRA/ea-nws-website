import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import FloodWarningKey from '../../../../common/components/custom/FloodWarningKey'
import LoadingSpinner from '../../../../common/components/custom/LoadingSpinner'
import Map from '../../../../common/components/custom/Map'
import Button from '../../../../common/components/gov-uk/Button'
import Details from '../../../../common/components/gov-uk/Details'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'
import AlertType from '../../../../common/enums/AlertType'
import { setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import {
  getLocationOtherAdditional,
  getRegistrationParams,
  updateLocationsAlertTypes
} from '../../../../common/services/ProfileServices'
import { getSurroundingFloodAreas } from '../../../../common/services/WfsFloodDataService'
import { useFetchAlerts } from '../../../../common/services/hooks/GetHistoricalAlerts'

const floodWarningCardDetails = (
  <>
    <p>They tell you when flooding is expected and will pose a risk to:</p>
    <ul className='govuk-list govuk-list--bullet'>
      <li>life and communities</li>
      <li>homes and businesses</li>
      <li>railway lines and infrastructure</li>
      <li>roads</li>
      <li>coastal areas affected by spray or waves overtopping</li>
      <li>flood plains, including caravans park and campsites</li>
      <li>major tourist and leisure attractions</li>
    </ul>
  </>
)

const floodAlertCardDetails = (
  <>
    <p>They tell you to be prepared and flooding could pose a risk to:</p>
    <ul className='govuk-list govuk-list--bullet'>
      <li>fields, recreational land and carparks</li>
      <li>minor roads</li>
      <li>farmland</li>
      <li>coastal areas affected by spray or waves overtopping</li>
    </ul>
  </>
)

const removeLocationdetails = (
  <>
    <p>You must keep at least one location on your account.</p>
    <p>
      <Link className='govuk-link' to='/manage-locations/add/search'>
        Add a new location
      </Link>{' '}
      before removing any you do not need.
    </p>
    <p>
      Or you could{' '}
      <Link className='govuk-link' to='/account/delete'>
        delete your account
      </Link>{' '}
      instead.
    </p>
  </>
)

export default function ViewLocationPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [successMessage, setSuccessMessage] = useState('')
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const canRemoveLocation = profile.pois.length > 1
  const [selectedFloodArea, setSelectedFloodArea] = useState(null)
  const [alertArea, setAlertArea] = useState(null)
  const [warningArea, setWarningArea] = useState(null)
  const floodHistoryData = useFetchAlerts()
  const [floodAlertCount, setFloodAlertCount] = useState(null)
  const [severeFloodWarningCount, setSevereFloodWarningCount] = useState(null)
  const locationsAlertTypes = getLocationOtherAdditional(
    selectedLocation?.additionals || [],
    'alertTypes'
  )
  const [isLoading, setIsLoading] = useState(true)

  const locationType = () => {
    if (
      locationsAlertTypes.includes(AlertType.FLOOD_WARNING) &&
      locationsAlertTypes.includes(AlertType.FLOOD_ALERT)
    ) {
      return 'both'
    } else if (locationsAlertTypes.includes(AlertType.FLOOD_WARNING)) {
      return 'severe'
    } else if (locationsAlertTypes.includes(AlertType.FLOOD_ALERT)) {
      return 'alert'
    }
  }
  const initialAlerts = locationsAlertTypes.includes(AlertType.FLOOD_ALERT)
  const [savedOptionalAlerts, setSavedOptionalAlerts] = useState(initialAlerts)
  const [pendingOptionalAlerts, setPendingOptionalAlerts] =
    useState(initialAlerts)

  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId() {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  const isSavedLocationTargetArea = (locationName, areas) => {
    return areas.filter((area) => locationName === area.properties.TA_Name)
  }

  // get flood area data
  useEffect(() => {
    async function setupSelectedLocation() {
      // need to check if location was added as a nearby target area (TA)
      // if added as a nearby TA, location name will be that nearby TA name
      // 1.5km bbox is set as placename search radius is set at 1.5km
      const { alertArea, warningArea } = await getSurroundingFloodAreas(
        selectedLocation.coordinates.latitude,
        selectedLocation.coordinates.longitude,
        1.5
      )

      const locationIsWarningArea = isSavedLocationTargetArea(
        selectedLocation.address,
        warningArea.features
      )

      const locationIsAlertArea = isSavedLocationTargetArea(
        selectedLocation.address,
        alertArea.features
      )

      if (locationIsWarningArea.length > 0) {
        setSelectedFloodArea(locationIsWarningArea[0])
      } else if (locationIsAlertArea.length > 0) {
        setSelectedFloodArea(locationIsAlertArea[0])
      }

      const isError = !warningArea && !alertArea
      if (isError) {
        navigate('/error')
      }

      setAlertArea(alertArea)
      setWarningArea(warningArea)
      setIsLoading(false)
    }
    setupSelectedLocation()
    getPartnerId()
  }, [])

  // get flood history data
  useEffect(() => {
    const setHistoricalAlertNumber = () => {
      const oneYearAgo = moment().subtract(1, 'years')
      if (alertArea) {
        const taCodes = alertArea.features.map((el) => {
          return el.properties.TA_CODE
        })

        const filteredAlert = floodHistoryData
          .filter(({ CODE }) => taCodes.includes(CODE))
          .filter((inDate) => moment(inDate.DATE, 'DD/MM/YYYY') > oneYearAgo)

        setFloodAlertCount(filteredAlert.length)
      }
    }

    const setHistoricalWarningNumber = () => {
      const oneYearAgo = moment().subtract(1, 'years')

      if (warningArea) {
        const taCodes = warningArea.features.map((el) => {
          return el.properties.TA_CODE
        })

        const filteredWarning = floodHistoryData
          .filter(({ CODE }) => taCodes.includes(CODE))
          .filter((inDate) => moment(inDate.DATE, 'DD/MM/YYYY') > oneYearAgo)

        setSevereFloodWarningCount(filteredWarning.length)
      }
    }

    async function processFloodHist() {
      if (floodHistoryData) {
        if (alertArea) {
          setHistoricalAlertNumber()
        }
        if (warningArea) {
          setHistoricalWarningNumber()
        }
      }
    }
    processFloodHist()
  }, [alertArea, warningArea])

  const deleteLocation = async (event) => {
    event.preventDefault()
    navigate('/manage-locations/remove', {
      state: {
        name: selectedLocation.address,
        locationId: selectedLocation.id,
        partnerId
      }
    })
  }

  const handleOptionalAlertSave = async (e) => {
    e.preventDefault()
    let updatedProfile

    if (pendingOptionalAlerts) {
      if (!locationsAlertTypes.includes(AlertType.FLOOD_ALERT)) {
        locationsAlertTypes = [...locationsAlertTypes, AlertType.FLOOD_ALERT]
      }
    } else {
      locationsAlertTypes = locationsAlertTypes.filter(
        (type) => type !== AlertType.FLOOD_ALERT
      )
    }

    const data = {
      authToken,
      locationId: selectedLocation.id,
      partnerId,
      params: getRegistrationParams(profile, locationsAlertTypes)
    }

    const { errorMessage } = await backendCall(
      data,
      'api/partner/update_location_registration',
      navigate
    )

    if (!errorMessage) {
      updatedProfile = await updateLocationAlerts(locationsAlertTypes)

      await updateGeosafeProfile(updatedProfile)

      const message = `You've turned ${
        pendingOptionalAlerts ? 'on' : 'off'
      } early flood alerts`

      setSuccessMessage(message)
      setSavedOptionalAlerts(pendingOptionalAlerts)
    }
  }

  const updateLocationAlerts = async (locationsAlertTypes) => {
    const updatedProfile = updateLocationsAlertTypes(
      profile,
      selectedLocation,
      locationsAlertTypes
    )
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const updateGeosafeProfile = async (updatedProfile) => {
    const dataToSend = { authToken, profile: updatedProfile }
    await backendCall(dataToSend, 'api/profile/update', navigate)
  }

  return (
    <>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-body'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-three-quarters'>
              <BackLink onClick={() => navigate(-1)} />
              {successMessage && (
                <NotificationBanner
                  className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-top-4'
                  title='Success'
                  text={successMessage}
                />
              )}
              <h1 className='govuk-!-margin-top-4 govuk-heading-l'>
                {selectedLocation.address}
              </h1>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <div className='view-location-map'>
                  <Map
                    types={locationsAlertTypes}
                    interactive={selectedFloodArea === null}
                    selectedFloodArea={selectedFloodArea}
                    showOnlySelectedFloodArea={selectedFloodArea !== null}
                    showMarker={selectedFloodArea === null}
                  />
                </div>
              )}
              <FloodWarningKey type={locationType()} />
              <h2 className='govuk-heading-m govuk-!-margin-top-5 govuk-!-margin-bottom-5'>
                Flood messages you get
              </h2>

              {/* flood warnings card */}
              {(locationType() === 'both' || locationType() === 'severe') && (
                <div className='govuk-summary-card'>
                  <div
                    className='govuk-summary-card__title-wrapper'
                    style={{ flexDirection: 'column' }}
                  >
                    <h2 className='govuk-summary-card__title govuk-!-font-size-24'>
                      Severe flood warnings and flood warnings
                    </h2>
                    <p className='govuk-!-margin-bottom-1 govuk-!-margin-top-0'>
                      Danger to life or property - act immediately
                    </p>
                  </div>
                  <div className='govuk-summary-card__content'>
                    <p className='govuk-body'>
                      Sent in last year: <b>{severeFloodWarningCount || 0}</b>
                    </p>
                    <Details
                      title='Risks when these are in force'
                      text={floodWarningCardDetails}
                    />
                  </div>
                </div>
              )}

              {/* flood alerts card */}
              {(locationType() === 'both' || locationType() === 'alert') && (
                <div className='govuk-summary-card'>
                  <div className='govuk-summary-card__title-wrapper govuk-!-padding-0'>
                    <div
                      className='govuk-summary-card__title-wrapper'
                      style={{ flexDirection: 'column' }}
                    >
                      <h2 className='govuk-summary-card__title govuk-!-font-size-24'>
                        Flood alerts {locationType() === 'both' && '(optional)'}
                      </h2>
                      <p className='govuk-!-margin-bottom-1 govuk-!-margin-top-0'>
                        Early alerts that flooding is possible - be prepared
                      </p>
                    </div>
                    {locationType() === 'both' && (
                      <div
                        className='govuk-summary-card__title-wrapper'
                        style={{ alignItems: 'center' }}
                      >
                        <div
                          className='govuk-radios govuk-radios--small govuk-radios--inline'
                          data-module='govuk-radios'
                        >
                          <div className='govuk-radios__item govuk-!-margin-right-0'>
                            <input
                              className='govuk-radios__input'
                              id='alert-on'
                              name='alert'
                              type='radio'
                              value='on'
                              checked={pendingOptionalAlerts === true}
                              onChange={() => {
                                setPendingOptionalAlerts(true)
                              }}
                            />
                            <label
                              className='govuk-label govuk-radios__label'
                              htmlFor='alert-on'
                            >
                              On
                            </label>
                          </div>
                          <div className='govuk-radios__item govuk-!-margin-right-0'>
                            <input
                              className='govuk-radios__input'
                              id='alert-off'
                              name='alert'
                              type='radio'
                              value='off'
                              checked={pendingOptionalAlerts === false}
                              onChange={() => {
                                setPendingOptionalAlerts(false)
                              }}
                            />
                            <label
                              className='govuk-label govuk-radios__label'
                              htmlFor='alert-off'
                            >
                              Off
                            </label>
                          </div>
                        </div>

                        <Link
                          onClick={(e) => {
                            e.preventDefault()
                            handleOptionalAlertSave(e)
                          }}
                          className='govuk-body govuk-link inline-link govuk-!-margin-bottom-0'
                          style={{ cursor: 'pointer' }}
                          aria-label='Save your preference for receiving early flood alerts'
                        >
                          Save
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className='govuk-summary-card__content'>
                    <p className='govuk-body'>
                      {savedOptionalAlerts
                        ? 'You currently get these early flood alerts.'
                        : 'You turned these early flood alerts off.'}
                    </p>
                    <p className='govuk-body'>
                      Sent in last year: <b>{floodAlertCount || 0}</b>
                    </p>
                    <Details
                      title='Risks when these are in force'
                      text={floodAlertCardDetails}
                    />
                  </div>
                </div>
              )}

              {canRemoveLocation ? (
                <>
                  <h2 className='govuk-heading-m'>
                    To stop all flood messages for this location
                  </h2>
                  <Button
                    onClick={deleteLocation}
                    className='govuk-button govuk-button--warning'
                    text='Remove location'
                  />
                </>
              ) : (
                <>
                  <Details
                    title='If you want to remove this location'
                    text={removeLocationdetails}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
