import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import FloodWarningKey from '../../../../common/components/custom/FloodWarningKey'
import Map from '../../../../common/components/custom/Map'
import Button from '../../../../common/components/gov-uk/Button'
import Details from '../../../../common/components/gov-uk/Details'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'
import AlertType from '../../../../common/enums/AlertType'
import { setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { csvToJson } from '../../../../common/services/CsvToJson'
import {
  getLocationOtherAdditional,
  getRegistrationParams,
  removeLocation,
  updateLocationsAlertTypes
} from '../../../../common/services/ProfileServices'
import { getSurroundingFloodAreas } from '../../../../common/services/WfsFloodDataService'

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

export default function ViewLocationPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { type } = useParams()
  const [successMessage, setSuccessMessage] = useState('')
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const [alertArea, setAlertArea] = useState(null)
  const [warningArea, setWarningArea] = useState(null)
  const [floodHistoryData, setFloodHistoryData] = useState(null)
  const [floodAlertCount, setFloodAlertCount] = useState(null)
  const [severeFloodWarningCount, setSevereFloodWarningCount] = useState(null)

  let alertTypes = getLocationOtherAdditional(
    selectedLocation.additionals,
    'alertTypes'
  )

  const [optionalAlerts, setOptionalAlerts] = useState(
    alertTypes.includes(AlertType.FLOOD_ALERT)
  )

  const areaAreas = type === 'both' ? ['severe', 'alert'] : [type]

  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId () {
    const { data } = await backendCall(
      'data',
      'api/service/get_partner_id'
    )
    setPartnerId(data)
  }

  // get flood area data
  useEffect(() => {
    async function fetchFloodAreaData () {
      const { alertArea, warningArea } = await getSurroundingFloodAreas(
        selectedLocation.coordinates.latitude,
        selectedLocation.coordinates.longitude
      )

      const isError = !warningArea && !alertArea
      if (isError) {
        navigate('/error')
      }

      setAlertArea(alertArea)
      setWarningArea(warningArea)
    }
    fetchFloodAreaData()
    getPartnerId()
  }, [])

  // get flood history data
  useEffect(() => {
    const setHistoricalAlertNumber = () => {
      const oneYearAgo = moment().subtract(1, 'years')
      if (alertArea) {
        const taCodes = alertArea.features.map((el) => {
          return el.properties.FWS_TACODE
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
          return el.properties.FWS_TACODE
        })

        const filteredWarning = floodHistoryData
          .filter(({ CODE }) => taCodes.includes(CODE))
          .filter((inDate) => moment(inDate.DATE, 'DD/MM/YYYY') > oneYearAgo)

        setSevereFloodWarningCount(filteredWarning.length)
      }
    }

    async function getHistoryUrl () {
      const { data } = await backendCall(
        'data',
        'api/locations/download_citizen_flood_history'
      )

      data &&
        fetch(data)
          .then((response) => response.text())
          .then((data) => {
            setFloodHistoryData(csvToJson(data))
          })
          .catch((e) =>
            console.error('Could not fetch Historic Flood Warning file', e)
          )
    }

    async function processFloodHist () {
      await getHistoryUrl()

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

  const deleteLocation = async () => {
    const data = {
      authToken,
      locationId: selectedLocation.id,
      partnerId
    }

    const { errorMessage } = await backendCall(
      data,
      'api/partner/unregister_location_from_partner',
      navigate
    )

    if (!errorMessage) {
      const updatedProfile = removeLocation(profile, selectedLocation.address)
      dispatch(setProfile(updatedProfile))

      await updateGeosafeProfile(updatedProfile)

      navigate('/manage-locations/remove', {
        state: { name: selectedLocation.address }
      })
    }
  }

  const handleOptionalAlertSave = async (e) => {
    e.preventDefault()
    let updatedProfile

    if (optionalAlerts) {
      if (!alertTypes.includes(AlertType.FLOOD_ALERT)) {
        alertTypes = [...alertTypes, AlertType.FLOOD_ALERT]
      }
    } else {
      alertTypes = alertTypes.filter((type) => type !== AlertType.FLOOD_ALERT)
    }

    const data = {
      authToken,
      locationId: selectedLocation.id,
      partnerId,
      params: getRegistrationParams(profile, alertTypes)
    }

    const { errorMessage } = await backendCall(
      data,
      'api/partner/update_location_registration',
      navigate
    )

    if (!errorMessage) {
      updatedProfile = await updateLocationAlerts(alertTypes)

      await updateGeosafeProfile(updatedProfile)

      const message = `You've turned ${
        optionalAlerts ? 'on' : 'off'
      } early flood alerts`
      setSuccessMessage(message)
    }
  }

  const updateLocationAlerts = async (alertTypes) => {
    const updatedProfile = updateLocationsAlertTypes(
      profile,
      selectedLocation,
      alertTypes
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
              <h1 className='govuk-heading-l'>{selectedLocation.address}</h1>
              <Map types={areaAreas} />
              <FloodWarningKey type={type} />
              <h2 className='govuk-heading-m govuk-!-margin-top-5 govuk-!-margin-bottom-5'>
                Flood messages you get
              </h2>

              {/* flood warnings card */}
              {(type === 'both' || type === 'severe') && (
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
              {(type === 'both' || type === 'alert') && (
                <div className='govuk-summary-card'>
                  <div className='govuk-summary-card__title-wrapper govuk-!-padding-0'>
                    <div
                      className='govuk-summary-card__title-wrapper'
                      style={{ flexDirection: 'column' }}
                    >
                      <h2 className='govuk-summary-card__title govuk-!-font-size-24'>
                        Flood alerts {type === 'both' && '(optional)'}
                      </h2>
                      <p className='govuk-!-margin-bottom-1 govuk-!-margin-top-0'>
                        Early alerts that flooding is possible - be prepared
                      </p>
                    </div>
                    {type === 'both' && (
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
                              checked={optionalAlerts === true}
                              onChange={() => setOptionalAlerts(true)}
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
                              checked={optionalAlerts === false}
                              onChange={() => setOptionalAlerts(false)}
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
                          onClick={(e) => handleOptionalAlertSave(e)}
                          className='govuk-body govuk-link inline-link govuk-!-margin-bottom-0'
                        >
                          Save
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className='govuk-summary-card__content'>
                    <p className='govuk-body'>
                      {optionalAlerts
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

              <h2 className='govuk-heading-m'>
                To stop all flood messages for this location
              </h2>
              <Button
                onClick={deleteLocation}
                className='govuk-button govuk-button--warning'
                text='Remove location'
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
