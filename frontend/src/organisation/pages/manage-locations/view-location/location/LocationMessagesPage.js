import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import linkIcon from '../../../../../common/assets/images/link.svg'
import BackLink from '../../../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../../../common/components/custom/LoadingSpinner'
import Popup from '../../../../../common/components/custom/Popup'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Radio from '../../../../../common/components/gov-uk/Radio'
import AlertType from '../../../../../common/enums/AlertType'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import store from '../../../../../common/redux/store'
import { getLocationAdditionals, getLocationOther, setCurrentLocationAlertTypes, setCurrentLocationChildrenIDs, setCurrentTA } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { csvToJson } from '../../../../../common/services/CsvToJson'
import { getFloodAreaByTaName, getFloodAreas, getFloodAreasFromShape } from '../../../../../common/services/WfsFloodDataService'
import { infoUrls } from '../../../../routes/info/InfoRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import LocationHeader from './location-information-components/LocationHeader'

export default function LocationMessagesPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orgId = useSelector((state) => state.session.orgId)

  const [isBannerDisplayed, setIsBannerDisplayed] = useState(false)
  const [locationUnlinked, setLocationUnlinked] = useState(false)

  const [loading, setLoading] = useState(true)
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const additionalData = useSelector((state) => getLocationAdditionals(state))
  const authToken = useSelector((state) => state.session.authToken)
  const [partnerId, setPartnerId] = useState(false)
  const [unlinkID, setUnlinkID] = useState(null)
  const exisitingChildrenIDs = useSelector((state) =>
    getLocationOther(state, 'childrenIDs')
  )

  const handleClose = () => {
    setUnlinkID(null)
  }

  const handleDelete = async () => {
    // unregister and delete linked area
    const unregisterData = {
      authToken,
      locationId: unlinkID,
      partnerId
    }
    await backendCall(
      unregisterData,
      'api/location/unregister_from_partner',
      navigate
    )
    const dataToSend = { authToken, orgId, locationIds: [unlinkID] }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/location/remove',
      navigate
    )
    if (!errorMessage) {
      // update current location childrenIds
      dispatch(setCurrentLocationChildrenIDs(exisitingChildrenIDs.filter(child => child.id !== unlinkID)))
      const locationToUpdate = store.getState().session.currentLocation
      const dataToSend = { authToken, orgId, location: locationToUpdate }
      await backendCall(dataToSend, 'api/location/update', navigate)
      setLocationUnlinked(true)
      setUnlinkID(null)
    }
  }

  async function getPartnerId () {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  const [withinAreas, setWithinAreas] = useState([])
  const [floodAreasInputs, setFloodAreasInputs] = useState([])
  const [floodHistoryUrl, setHistoryUrl] = useState('')
  const [floodHistoryData, setFloodHistoryData] = useState(null)
  const [floodCounts, setFloodCounts] = useState([])
  const alertTypes = additionalData.alertTypes
  const [availableAlerts, setAvailableAlerts] = useState([])
  const childrenIDs = useSelector((state) => getLocationOther(
    state,
    'childrenIDs'
  )) || []
  const allAlertTypes = [AlertType.SEVERE_FLOOD_WARNING, AlertType.FLOOD_WARNING, AlertType.FLOOD_ALERT]
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

  const getWithinAreas = async () => {
    let result = []
    if (additionalData.location_data_type) {
      if (additionalData.location_data_type === LocationDataType.X_AND_Y_COORDS) {
        result = await getFloodAreas(
          currentLocation.coordinates.latitude, currentLocation.coordinates.longitude
        )
      } else if (currentLocation.geometry?.geoJson) {
        const geoJson = JSON.parse(currentLocation.geometry.geoJson)
        result = await getFloodAreasFromShape(
          geoJson
        )
      }
    }
    setWithinAreas(result)
  }

  const onClick = async (e, areaName) => {
    e.preventDefault()
    const floodArea = await getFloodAreaByTaName(areaName)
    dispatch(setCurrentTA(floodArea))
    navigate(orgManageLocationsUrls.view.viewFloodArea)
  }

  const categoryToMessageType = (type) => {
    const typeMap = {
      'Flood Warning': ['Flood Warning', 'Severe Flood Warning'],
      'Flood Warning Groundwater': ['Flood Warning', 'Severe Flood Warning'],
      'Flood Warning Rapid Response': ['Flood Warning', 'Severe Flood Warning'],
      'Flood Alert': ['Flood Alert'],
      'Flood Alert Groundwater': ['Flood Alert']
    }
    return typeMap[type] || []
  }

  const setHistoricalData = (taCode, type) => {
    const twoYearsAgo = moment().subtract(2, 'years')
    if (taCode && type) {
      const newCount = { TA_CODE: taCode, counts: [] }
      const messageTypes = categoryToMessageType(type)
      for (const messageType of messageTypes) {
        const filteredData = floodHistoryData.filter(
          (alert) =>
            alert.CODE === taCode &&
            alert.TYPE === messageType &&
            moment(alert.DATE, 'DD/MM/YYYY') > twoYearsAgo
        )
        newCount.counts.push({ type: messageType, count: filteredData.length })
      }
      setFloodCounts((prev) => [...prev, newCount])
    }
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  useEffect(() => {
    const processFloodData = () => {
      if (floodHistoryData && hasFetchedArea) {
        if (withinAreas.length > 0) {
          withinAreas.forEach((area) => setHistoricalData(area.properties.TA_CODE, area.properties.category))
        }
        if (childrenIDs.length > 0) {
          childrenIDs.forEach((child) => setHistoricalData(child.TA_CODE, child.category))
        }
      }
    }
    processFloodData()
  }, [floodHistoryData, withinAreas, hasFetchedArea])

  const populateMessagesSent = (category, floodCount) => {
    const messageSent = []
    const messageTypes = categoryToMessageType(category)
    for (const messageType of messageTypes) {
      let count
      switch (messageType) {
        case 'Severe Flood Warning':
          count = floodCount.counts.find((count) => count.type === messageType)?.count
          messageSent.push(`${count} severe flood warning${count === 1 ? '' : 's'}`)
          break
        case 'Flood Warning':
          count = floodCount.counts.find((count) => count.type === messageType)?.count
          messageSent.push(`${count} flood warning${count === 1 ? '' : 's'}`)
          break
        case 'Flood Alert':
          count = floodCount.counts.find((count) => count.type === messageType)?.count
          messageSent.push(`${count} flood alert${count === 1 ? '' : 's'}`)
          break
        case 'default':
          messageSent.push('')
          break
      }
    }
    return messageSent
  }

  useEffect(() => {
    const populateInputs = (withinAreas, childrenIDs, floodCounts) => {
      const updatedFloodAreas = []
      for (const area of withinAreas) {
        const taCode = area.properties.TA_CODE
        const floodCount = floodCounts.find((area) => area.TA_CODE === taCode)
        const messageSent = floodCount ? populateMessagesSent(area.properties.category, floodCount) : []
        const type = categoryToMessageType(area.properties.category)
        updatedFloodAreas.push({
          areaName: area.properties.TA_Name,
          areaType: `${type.includes('Flood Warning') ? 'Flood warning' : 'Flood alert'} area`,
          messagesSent: messageSent
        })
      }
      for (const area of childrenIDs) {
        const taCode = area.TA_CODE
        const floodCount = floodCounts.find((area) => area.TA_CODE === taCode)
        const messageSent = floodCount ? populateMessagesSent(area.category, floodCount) : []
        const type = categoryToMessageType(area.category)
        updatedFloodAreas.push({
          areaName: area.TA_Name,
          areaType: `${type.includes('Flood Warning') ? 'Flood warning' : 'Flood alert'} area`,
          messagesSent: messageSent,
          linked: area.id
        })
      }
      setFloodAreasInputs(updatedFloodAreas)
    }

    if ((withinAreas.length > 0 || childrenIDs.length > 0) && floodCounts.length > 0) {
      populateInputs(withinAreas, childrenIDs, floodCounts)
    }
  }, [withinAreas, floodCounts])

  useEffect(() => {
    if (floodAreasInputs.length > 0) {
      const alertsArray = []
      for (const area of floodAreasInputs) {
        const typeMap = {
          'Flood warning area': ['Flood warnings', 'Severe flood warnings'],
          'Flood alert area': ['Flood alerts']
        }
        alertsArray.push(...(typeMap[area.areaType] || []))
      }
      setAvailableAlerts(alertsArray)
    }
  }, [floodAreasInputs])

  useEffect(() => {
    if ((hasFetchedArea) || (floodAreasInputs.length > 0)) {
      setLoading(false)
    }
  }, [withinAreas, floodAreasInputs, floodCounts, hasFetchedArea])

  // it should reload the surrounding areas if the location is changed
  useEffect(() => {
    hasFetchedArea.current = false
    const fetchAreas = async () => {
      if (currentLocation && (currentLocation.coordinates || currentLocation.geometry || currentLocation.geocode)) {
        if (!hasFetchedArea.current) {
          await getWithinAreas()
          if (withinAreas.length > 0) {
            hasFetchedArea.current = true
          }
        }
      }
    }
    fetchAreas()
  }, [currentLocation])

  useEffect(() => {
    async function getHistoryUrl () {
      const { data } = await backendCall(
        'data',
        'api/locations/download_flood_history'
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

  const handleSubmit = async (event) => {
    event.preventDefault()
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

      const locationToUpdate = store.getState().session.currentLocation

      const updateData = { authToken, orgId, location: locationToUpdate }
      await backendCall(updateData, 'api/location/update', navigate)

      const locationIDsToUpdate = [locationToUpdate.id, ...childrenIDs.filter((child) => child?.id).map((child) => child.id)]

      for (const locationID of locationIDsToUpdate) {
        const registerData = {
          authToken,
          locationId: locationID,
          partnerId,
          params: {
            channelVoiceEnabled: true,
            channelSmsEnabled: true,
            channelEmailEnabled: true,
            channelMobileAppEnabled: true,
            partnerCanView: true,
            partnerCanEdit: true,
            alertTypes: alertTypesDispatch
          }
        }

        await backendCall(
          registerData,
          'api/location/update_registration',
          navigate
        )
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
      {availableAlerts.length > 0
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
              {availableAlerts.includes(message)
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
                  <>
                    <td className='govuk-table__cell' />
                    <td
                      className='govuk-table__cell'
                      style={{ lineHeight: '50px' }}
                    >
                      Unavailable
                    </td>
                  </>
                  )}
            </tr>
          ))}
        </tbody>
      </table>

      {availableAlerts.length > 0 && (
        <Button
          text='Save message settings'
          className='govuk-button'
          onClick={handleSubmit}
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
                <p className='govuk-!-width-one-half'>
                  {additionalData.locationName} can get flood messages for these areas.
                  You may be also able to link {additionalData.locationName} to nearby
                  flood areas that get flood messages.
                </p>
                )
              : (
                <p className='govuk-!-width-one-half'>
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
                <span className='govuk-caption-m'>
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
                          <Link onClick={(e) => onClick(e, detail.areaName)} className='govuk-link'>
                            {detail.areaName}
                          </Link>
                        </td>
                        <td
                          className='govuk-table__cell'
                          style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                        >
                          {detail.linked &&
                            <svg width='26' height='20' viewBox='0 0 26 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <path d='M24.0109 10.4792C26.4088 8.08136 26.4088 4.19439 24.0109 1.7965C21.7282 -0.486187 18.0631 -0.609922 15.6311 1.51916L15.3708 1.74957C14.9441 2.12077 14.9015 2.76931 15.2727 3.19598C15.6439 3.62265 16.2924 3.66532 16.7191 3.29411L16.9793 3.06371C18.6007 1.64716 21.0413 1.72823 22.5645 3.25145C24.1602 4.84719 24.1602 7.43708 22.5645 9.0371L17.7303 13.867C16.1345 15.4628 13.5404 15.4628 11.9446 13.867C10.4214 12.3438 10.3404 9.90324 11.7569 8.28189L11.9574 8.05149C12.3286 7.62482 12.286 6.98054 11.8593 6.60507C11.4326 6.2296 10.7884 6.27654 10.4129 6.70321L10.2124 6.93361C8.08754 9.36563 8.21127 13.0307 10.494 15.3134C12.8918 17.7113 16.7788 17.7113 19.1767 15.3134L24.0109 10.4792ZM1.79842 9.5235C-0.599472 11.9214 -0.599472 15.8084 1.79842 18.202C4.08537 20.4889 7.75047 20.6084 10.1825 18.4793L10.4428 18.2489C10.8694 17.8777 10.9121 17.2292 10.5409 16.8025C10.1697 16.3758 9.52115 16.3332 9.09448 16.7044L8.83421 16.9348C7.21286 18.3513 4.77231 18.2702 3.24909 16.747C1.65335 15.1513 1.65335 12.5614 3.24909 10.9614L8.08327 6.13574C9.67902 4.53999 12.2689 4.53999 13.8689 6.13574C15.3921 7.65895 15.4732 10.0995 14.0567 11.7209L13.8263 11.9811C13.4551 12.4078 13.4977 13.0521 13.9244 13.4275C14.3511 13.803 14.9953 13.7561 15.3708 13.3294L15.6012 13.0691C17.7303 10.6371 17.6066 6.97201 15.3239 4.68506C12.926 2.28717 9.03901 2.28717 6.64112 4.68506L1.79842 9.5235Z' fill='black' />
                            </svg>}{' '}
                          {detail.areaType}
                        </td>
                        <td
                          className='govuk-table__cell'
                          style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                        >
                          {detail.messagesSent.map((messageSent, index) => (
                            <span key={index}>{messageSent}<br /></span>
                          ))}

                        </td>
                        <td
                          className='govuk-table__cell'
                          style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                        >
                          {detail.linked && <Link className='govuk-link' onClick={() => setUnlinkID(detail.linked)}>Unlink</Link>}
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
        onClick={(event) => {
          event.preventDefault()
          navigate(orgManageLocationsUrls.add.linkToTargetArea)
        }}
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
        {locationUnlinked && (
          <NotificationBanner
            className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-8'
            title='Success'
            text='Flood area unlinked'
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
        {unlinkID &&
          <Popup
            onDelete={() => handleDelete()}
            onClose={() => handleClose()}
            title='Unlink flood area'
            popupText='If you continue flood messages will not be received for this flood area.'
            buttonText='Unlink flood area'
            buttonClass='govuk-button--warning'
          />}
      </main>
    </>
  )
}
