import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import linkIcon from '../../../../../common/assets/images/link.svg'
import BackLink from '../../../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../../../common/components/custom/LoadingSpinner'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Radio from '../../../../../common/components/gov-uk/Radio'
import AlertType from '../../../../../common/enums/AlertType'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import { getLocationOtherAdditional, setCurrentLocationAlertTypes } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { csvToJson } from '../../../../../common/services/CsvToJson'
import { getSurroundingFloodAreas, getSurroundingFloodAreasFromShape } from '../../../../../common/services/WfsFloodDataService'
import { infoUrls } from '../../../../routes/info/InfoRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import LocationHeader from './location-information-components/LocationHeader'
export default function LocationMessagesPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isBannerDisplayed, setIsBannerDisplayed] = useState(false)

  const [loading, setLoading] = useState(true)
  const currentLocation = useSelector(
    (state) => state.session.currentLocation
  )
  const additionalData = currentLocation.additionals
  
  const [isAreaNearby, setIsAreaNearby] = useState(true)
  const [alertAreas, setAlertAreas] = useState(null)
  const [warningAreas, setWarningAreas] = useState(null)
  const [floodAreasInputs, setFloodAreasInputs] = useState([])
  const [floodHistoryUrl, setHistoryUrl] = useState('')
  const [floodHistoryData, setFloodHistoryData] = useState(null)
  const [floodAlertsCount, setFloodAlertsCount] = useState([])
  const [floodWarningsCount, setFloodWarningsCount] = useState([])
  const [severeFloodWarningsCount, setSevereFloodWarningsCount] = useState([])
  const alertTypes =  getLocationOtherAdditional(
    additionalData,
    'alertTypes'
  )
  const allAlertTypes = [AlertType.SEVERE_FLOOD_WARNING, AlertType.FLOOD_WARNING, AlertType.FLOOD_ALERT]
  const childrenId = ['flood_alerts.33'] // TODO additionalData.childrenId
  const hasFetchedArea = useRef(false)
  const [alertTypesEnabled, setAlertTypesEnabled] = useState([
    alertTypes?.includes(allAlertTypes[0]),
    alertTypes?.includes(allAlertTypes[1]),
    alertTypes?.includes(allAlertTypes[2])
  ])

  const alertTypesEnabledOriginal = [
    alertTypes?.includes(allAlertTypes[0]),
    alertTypes?.includes(allAlertTypes[1]),
    alertTypes?.includes(allAlertTypes[2])
  ]

  const messageSettings = [
    'Severe flood warnings',
    'Flood warnings',
    'Flood alerts'
  ]

  const surroundingAreas = async () => {
    let result
    if (additionalData.location_data_type === LocationDataType.X_AND_Y_COORDS || currentLocation.geometry === null) {
      result = await getSurroundingFloodAreas(
        currentLocation.coordinates.latitude, currentLocation.coordinates.longitude,
        0.5
      )
    } else {
      const geoJson = JSON.parse(currentLocation.geometry.geoJson)
      result = await getSurroundingFloodAreasFromShape(
        geoJson,
        0.5
      )
    }
    setAlertAreas(result.alertArea)
    setWarningAreas(result.warningArea)
  }

  const setHistoricalData = (area, type, index) => {
    const twoYearsAgo = moment().subtract(2, 'years')
    if (area) {
      const taCode = area.properties.FWS_TACODE

      const filteredData = floodHistoryData.filter(
        (alert) =>
          alert['TA Code'] === taCode &&
          alert['lookup category'] === type &&
          (moment(alert.Approved
            , 'DD/MM/YYYY HH:MM:SS')).format('DD/MM/YYYY') > twoYearsAgo.format('DD/MM/YYYY'))
      switch (type) {
        case 'Flood Alert':
          setFloodAlertsCount(prevState => {
            const updatedState = [...prevState]
            updatedState[index] = filteredData.length
            return updatedState
          })
          break
        case 'Flood Warning':
          setFloodWarningsCount(prevState => {
            const updatedState = [...prevState]
            updatedState[index] = filteredData.length
            return updatedState
          })
          break
        case 'Flood Warning Rapid Response':
          setSevereFloodWarningsCount(prevState => {
            const updatedState = [...prevState]
            updatedState[index] = filteredData.length
            return updatedState
          })
          break
        default:
          break
      }
    }
  }

  useEffect(() => {
    const processFloodData = () => {
      if (floodHistoryData && hasFetchedArea) {
        let allAreas
        let warnings
        let alerts
        if (additionalData.location_data_type === LocationDataType.X_AND_Y_COORDS || currentLocation.geometry === null) {
          allAreas = alertAreas && warningAreas ? [...warningAreas.features, ...alertAreas.features] : []
          warnings = warningAreas ? [...warningAreas.features] : []
          alerts = alertAreas ? [...alertAreas.features] : []
        } else {
          allAreas = alertAreas && warningAreas ? [...warningAreas, ...alertAreas] : []
          warnings = warningAreas ? [...warningAreas] : []
          alerts = alertAreas ? [...alertAreas] : []
        }

        if (alerts.length > 0 && warnings.length > 0) {
          allAreas.forEach((area, index) => setHistoricalData(area, 'Flood Warning', index))
          allAreas.forEach((area, index) => setHistoricalData(area, 'Flood Warning Rapid Response', index))
          allAreas.forEach((area, index) => setHistoricalData(area, 'Flood Alert', index))
        } else if (warnings.length > 0) {
          warnings.forEach((area, index) => setHistoricalData(area, 'Flood Alert', index))
          warnings.forEach((area, index) => setHistoricalData(area, 'Flood Warning', index))
          warnings.forEach((area, index) => setHistoricalData(area, 'Flood Warning Rapid Response', index))
        } else if (alerts.length > 0) {
          alerts.forEach((area, index) => setHistoricalData(area, 'Flood Alert', index))
        } else {
          if (warningAreas && alertAreas) {
            setIsAreaNearby(false)
          }
        }
      }
    }
    processFloodData()
  }, [floodHistoryData, warningAreas, alertAreas, hasFetchedArea])

  useEffect(() => {
    const populateInputs = (alertAreas, warningAreas) => {
      const updatedFloodAreas = []
      if (warningAreas) {
        const warningAreasInputs = additionalData.location_data_type === LocationDataType.X_AND_Y_COORDS || currentLocation.geometry === null ? warningAreas.features : warningAreas
        for (let j = 0; j < warningAreasInputs.length; j++) {
          updatedFloodAreas.push({
            areaName:
            warningAreasInputs[j].properties.TA_NAME,
            areaType: `${severeFloodWarningsCount[j] > 0 ? 'Severe flood warning area' : 'Flood warning area'}`,
            messagesSent: [`${severeFloodWarningsCount[j]} severe flood warning${severeFloodWarningsCount[j] > 1 ? 's' : ''}`, `${floodWarningsCount[j]} flood warning${floodWarningsCount[j] > 1 ? 's' : ''}`, `${floodAlertsCount[j]} flood alert${floodAlertsCount[j] > 1 ? 's' : ''}`],
            linked: childrenId.includes(warningAreasInputs[j].id)
          })
        }
      }
      if (alertAreas) {
        const alertAreasInputs = additionalData.location_data_type === LocationDataType.X_AND_Y_COORDS || currentLocation.geometry === null ? alertAreas.features : alertAreas
        const warningAreaLength = warningAreas ? warningAreas.length : 0
        for (let i = 0; i < alertAreas.length; i++) {
          const alertAreaIndex = warningAreaLength > 0 ? i + warningAreaLength : i
          updatedFloodAreas.push({
            areaName:
            alertAreasInputs[i].properties.TA_NAME,
            areaType: 'Alert areas',
            messagesSent: [`${floodAlertsCount[alertAreaIndex]} flood alert${floodAlertsCount[alertAreaIndex] > 1 ? 's' : ''}`],
            linked: childrenId.includes(alertAreasInputs[i].id)
          })
        }
      }
      setFloodAreasInputs(updatedFloodAreas)
    }

    if (floodHistoryData !== null && (alertAreas || warningAreas)) {
      populateInputs(alertAreas, warningAreas)
    }
  }, [warningAreas, alertAreas, floodAlertsCount, floodWarningsCount, severeFloodWarningsCount])

  useEffect(() => {
    const areAllCountsLoaded = floodAlertsCount.length > 0 || floodWarningsCount.length > 0 || severeFloodWarningsCount.length > 0
    if ((hasFetchedArea && !isAreaNearby) || (floodAreasInputs.length > 0 && areAllCountsLoaded)) {
      setLoading(false)
    }
  }, [isAreaNearby, alertAreas, warningAreas, floodAreasInputs, floodAlertsCount, floodWarningsCount, severeFloodWarningsCount, hasFetchedArea])

  // it should reload the surrounding areas if the location is changed
  useEffect(() => {
    hasFetchedArea.current = false
  }, [currentLocation])

  useEffect(() => {
    const fetchAreas = async () => {
      if (currentLocation && (currentLocation.coordinates || currentLocation.geometry || currentLocation.geocode)) {
        if (!hasFetchedArea.current) {
          await surroundingAreas()
          if (alertAreas && warningAreas) {
            hasFetchedArea.current = true
          }
        }
      }
    }
    fetchAreas()
  }, [currentLocation, additionalData, alertAreas, warningAreas])

  useEffect(() => {
    async function getHistoryUrl () {
      const { data } = await backendCall(
        'data',
        'api/locations/download_org_flood_history'
      )
      setHistoryUrl(data)
    }
    getHistoryUrl()
    floodHistoryUrl &&
      fetch(floodHistoryUrl)
        .then((response) => response.text())
        .then((data) => {
          setFloodHistoryData(csvToJson(data))
        })
        .catch((e) =>
          console.error('Could not fetch Organisation Historic Flood Warning file', e)
        )
  }, [floodHistoryUrl])

  const handleSumbit = () => {
    if (
      alertTypesEnabledOriginal.every(
        (value, index) => value === alertTypesEnabled[index]
      )
    ) {
      return null
    } else {
      setIsBannerDisplayed(true)

      const alertTypesDispatch = []
      alertTypesEnabled.forEach((enabled, index) => {
        if (enabled) alertTypesDispatch.push(allAlertTypes[index])
      })

      if (alertTypesDispatch.length > 0) {
        dispatch(setCurrentLocationAlertTypes(alertTypesDispatch))
      }
    }
  }

  const handleChangeRadio = (index, value) => {
    const newalertTypesEnabled = [...alertTypesEnabled]
    newalertTypesEnabled[index] = value
    setAlertTypesEnabled(newalertTypesEnabled)
    setIsBannerDisplayed(false)
  }

  const messageSettingsSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Message settings
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
      {alertTypes
        ? (
          <p>
            You can choose which flood messages to get for each location if
            they're available.
            <br />
          </p>
          )
        : (
          <>
            <p>
              Flood messages are currently unavailable for this location. This may
              be because there are no measurement guages in the area of the
              location. Or the location is in an area where not many people live
              or work.
            </p>
            <p>
              But you may be able to link this location to any nearby flood areas
              that can get flood messages in the Flood areas section.
            </p>
            <p>
              And if any flood messages become available for this location in the
              future we'll automatically send them to you. You can then customise
              by choosing which flood messages to get.
            </p>
          </>
          )}
      <p>
        <Link to={infoUrls.floodTypes} className='govuk-link'>
          What are the different types of flood messages?
        </Link>
      </p>
      <br />

      <table className='govuk-table govuk-table--small-text-until-tablet'>
        <tbody className='govuk-table__body'>
          {messageSettings.map((message, index) => (
            <tr className='govuk-table__row' key={index}>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle' }}
              >
                <strong>{message}</strong>
              </td>
              {alertTypes
                ? (
                  <>
                    <td className='govuk-table__cell'>
                      <Radio
                        label='On'
                        small
                        value={'Radio_On_' + index}
                        name={'Radio_' + index}
                        checked={alertTypesEnabled[index]}
                        onChange={() => handleChangeRadio(index, true)}
                      />
                    </td>
                    <td className='govuk-table__cell'>
                      <Radio
                        label='Off'
                        small
                        value={'Radio_Off_' + index}
                        name={'Radio_' + index}
                        checked={!alertTypesEnabled[index]}
                        onChange={() => handleChangeRadio(index, false)}
                      />
                    </td>
                  </>
                  )
                : (
                  <td
                    className='govuk-table__cell'
                    style={{ textAlign: 'right', lineHeight: '50px' }}
                  >
                    Unavailable
                  </td>
                  )}
            </tr>
          ))}
        </tbody>
      </table>

      {alertTypes && (
        <Button
          text='Save message settings'
          className='govuk-button'
          onClick={handleSumbit}
        />
      )}
    </>
  )

  const floodAreasSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Flood areas
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />

      {loading
        ? (<LoadingSpinner />)
        : (
          <>
            {floodAreasInputs.length > 0
              ? (
                <p>
                  {additionalData.locationName} can get flood messages for these areas.
                  You may be also able to link {additionalData.locationName} to nearby
                  flood areas that get flood messages.
                </p>
                )
              : (
                <p>
                  Flood messages are currently unavailable for this location.
                  But you may be able to link this location to any nearby flood areas
                  that can get flood messages.
                </p>
                )}
            <br />
            <p>
              <Link to={infoUrls.floodAreas} className='govuk-link'>
                What are flood areas?
              </Link>
            </p>
            <br />

            {floodAreasInputs.length > 0 &&
            (
              <>
                <span class='govuk-caption-m'>
                  {floodAreasInputs.length} flood areas
                </span>

                <table className='govuk-table govuk-table--small-text-until-tablet'>
                  <thead className='govuk-table__head'>
                    <tr className='govuk-table__row'>
                      <th scope='col' className='govuk-table__header'>
                        Area name
                      </th>
                      <th scope='col' className='govuk-table__header'>
                        Area type
                      </th>
                      <th scope='col' className='govuk-table__header'>
                        Total messages sent in the
                        <br /> last 2 years
                      </th>
                      <th scope='col' className='govuk-table__header' />
                    </tr>
                  </thead>
                  <tbody className='govuk-table__body'>
                    {floodAreasInputs.map((detail, index) => (
                      <tr key={index} className='govuk-table__row'>
                        <td
                          className='govuk-table__cell'
                          style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                        >
                          <Link to='/' className='govuk-link'>
                            {detail.areaName}
                          </Link>
                        </td>
                        <td
                          className='govuk-table__cell'
                          style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                        >
                          {/* TODO: Add link icon if location is already linked */}
                          {/* <img
                          src={linkIcon}
                          alt='Link icon'
                          style={{ marginRight: '10px' }}
                        /> */}
                          {detail.areaType}
                        </td>
                        <td
                          className='govuk-table__cell'
                          style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                        >
                          {detail.messagesSent.map((messageSent, index) => (
                            <tr rowSpan={index} key={index}>{messageSent}</tr>
                          ))}

                        </td>
                        <td
                          className='govuk-table__cell'
                          style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                        >
                          {detail.linked
                            ? (
                              <Link className='govuk-link'>Unlink</Link>
                              )
                            : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
          )}

      <Button
        imageSrc={linkIcon}
        text='Link to nearby flood areas'
        className='govuk-button govuk-button--secondary'
        // TODO: Add link to nearby flood areas
        onClick={() => navigate('/')}
      />
    </>
  )

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(orgManageLocationsUrls.view.dashboard)
  }

  return (
    <>

      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-0'>
        {isBannerDisplayed && (
          <NotificationBanner
            className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-8'
            title='Success'
            text={
              'Message settings for ' +
              additionalData.locationName +
              ' updated'
            }
          />
        )}
        <LocationHeader
          currentPage={orgManageLocationsUrls.view.viewMessages}
        />

        {/* details */}
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {messageSettingsSection}
          </div>
        </div>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-!-margin-top-9'>
            {floodAreasSection}
          </div>
        </div>
      </main>
    </>
  )
}
