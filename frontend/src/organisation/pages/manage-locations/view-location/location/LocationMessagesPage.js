import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import linkIcon from '../../../../../common/assets/images/link.svg'
import BackLink from '../../../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../../../common/components/custom/LoadingSpinner'
import Popup from '../../../../../common/components/custom/Popup'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Radio from '../../../../../common/components/gov-uk/Radio'
import AlertState from '../../../../../common/enums/AlertState'
import AlertType from '../../../../../common/enums/AlertType'
import store from '../../../../../common/redux/store'
import {
  getAdditional,
  getLocationAdditionals,
  getLocationOther,
  setCurrentLocationAlertTypes,
  setCurrentLocationChildrenIDs,
  setCurrentTA
} from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { getFloodAreaByTaCode } from '../../../../../common/services/WfsFloodDataService'
import { infoUrls } from '../../../../routes/info/InfoRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import LocationHeader from './location-information-components/LocationHeader'

export default function LocationMessagesPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orgId = useSelector((state) => state.session.orgId)
  const [isBannerDisplayed, setIsBannerDisplayed] = useState(false)
  const [locationUnlinked, setLocationUnlinked] = useState(false)
  const [loading, setLoading] = useState(true)
  const currentLocationTAs =
    useSelector((state) => getLocationOther(state, 'targetAreas')) || []
  const additionalData = useSelector((state) => getLocationAdditionals(state))
  const authToken = useSelector((state) => state.session.authToken)
  const [partnerId, setPartnerId] = useState(false)
  const [unlinkID, setUnlinkID] = useState(null)
  const exisitingChildrenIDs = useSelector((state) =>
    getLocationOther(state, 'childrenIDs')
  )
  const isPredefinedBoundary = additionalData.location_data_type === 'boundary'

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
      dispatch(
        setCurrentLocationChildrenIDs(
          exisitingChildrenIDs.filter((child) => child.id !== unlinkID)
        )
      )
      const locationToUpdate = store.getState().session.currentLocation
      const dataToSend = { authToken, orgId, location: locationToUpdate }
      await backendCall(dataToSend, 'api/location/update', navigate)
      setLocationUnlinked(true)
      setUnlinkID(null)
    }

    // Directly remove flood area from the table state so it can be reflected on page (without refreshing)
    setFloodAreasInputs((prevInputs) =>
      prevInputs.filter((input) => input.linked !== unlinkID)
    )
  }

  const [floodAreasInputs, setFloodAreasInputs] = useState([])
  const alertTypes = additionalData.alertTypes
  const [availableAlerts, setAvailableAlerts] = useState(new Set())
  const childrenIDs =
    useSelector((state) => getLocationOther(state, 'childrenIDs')) || []
  const allAlertTypes = [
    AlertType.SEVERE_FLOOD_WARNING,
    AlertType.FLOOD_WARNING,
    AlertType.FLOOD_ALERT
  ]
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

  const getFloodMessagesAvailableForLocation = (type) => {
    const typeMap = {
      'Flood Warning': [messageSettings[0], messageSettings[1]],
      'Flood Warning Groundwater': [messageSettings[0], messageSettings[1]],
      'Flood Warning Rapid Response': [messageSettings[0], messageSettings[1]],
      'Flood Alert': [messageSettings[2]],
      'Flood Alert Groundwater': [messageSettings[2]]
    }
    return typeMap[type] || []
  }

  const [floodAreas, setFloodAreas] = useState([])

  useEffect(() => {
    const loadFloodAlertData = async () => {
      const { data: partnerId } = await backendCall(
        'data',
        'api/service/get_partner_id'
      )

      const options = {
        states: [AlertState.CURRENT, AlertState.PAST],
        boundingBox: null,
        channels: [],
        partnerId
      }

      const twoYearsAgo = new Date()
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)

      const { data: alertsData } = await backendCall(
        { options, filterDate: twoYearsAgo },
        'api/alert/list',
        navigate
      )

      let floodAreas = []
      getFloodMessagesSent(
        currentLocationTAs,
        alertsData.alerts,
        floodAreas,
        false
      )
      getFloodMessagesSent(childrenIDs, alertsData.alerts, floodAreas, true)
      setFloodAreas(floodAreas)

      // get available alerts for location
      let availableAlerts = new Set()
      floodAreas.forEach((area) => {
        const messages = getFloodMessagesAvailableForLocation(area.type)
        messages.forEach((message) => availableAlerts.add(message))
      })
      setAvailableAlerts(availableAlerts)
    }

    loadFloodAlertData()
    setLoading(false)
  }, [])

  const getFloodMessagesSent = (
    targetAreas,
    alerts,
    floodAreas,
    linkedChild
  ) => {
    targetAreas.forEach((targetArea) => {
      let severeWarningsCount = 0,
        warningsCount = 0,
        alertsCount = 0
      alerts.forEach((alert) => {
        const extraInfo = alert.mode.zoneDesc.placemarks[0].extraInfo
        const alertTaCode = getAdditional(extraInfo, 'TA_CODE')
        const alertType = alert.type
        if (alertTaCode === targetArea.TA_CODE) {
          switch (alertType) {
            case AlertType.SEVERE_FLOOD_WARNING:
              severeWarningsCount++
              break
            case AlertType.FLOOD_WARNING:
              warningsCount++
              break
            case AlertType.FLOOD_ALERT:
              alertsCount++
              break
          }
        }
      })
      const floodArea = {
        code: targetArea.TA_CODE,
        name: targetArea.TA_Name,
        type: targetArea.category,
        severeWarningMessagesCount: severeWarningsCount,
        warningMessagesCount: warningsCount,
        alertMessagesCount: alertsCount,
        linked: linkedChild ? targetArea.id : null
      }

      floodAreas.push(floodArea)
    })
  }

  const updateMessageSettings = async (event) => {
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

      if (alertTypesDispatch.includes(AlertType.SEVERE_FLOOD_WARNING)) {
        alertTypesDispatch.push(AlertType.REMOVE_FLOOD_SEVERE_WARNING)
      }

      if (alertTypesDispatch.includes(AlertType.FLOOD_WARNING)) {
        alertTypesDispatch.push(AlertType.REMOVE_FLOOD_WARNING)
      }

      dispatch(setCurrentLocationAlertTypes(alertTypesDispatch))

      const locationToUpdate = store.getState().session.currentLocation

      const updateData = { authToken, orgId, location: locationToUpdate }
      await backendCall(updateData, 'api/location/update', navigate)

      const locationIDsToUpdate = [
        locationToUpdate.id,
        ...childrenIDs.filter((child) => child?.id).map((child) => child.id)
      ]

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

  const onClick = async (e, areaCode) => {
    e.preventDefault()
    const floodArea = await getFloodAreaByTaCode(areaCode)
    dispatch(setCurrentTA(floodArea))
    navigate(orgManageLocationsUrls.view.viewFloodArea)
  }

  const messageSettingsSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Message settings
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
      {availableAlerts.size > 0 ? (
        <p>
          You can choose which flood messages to get for each location if
          they're available.
          <br />
        </p>
      ) : (
        <>
          <p>
            Flood messages are currently unavailable for this location. This may
            be because there are no measurement gauges in the area of the
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
              {availableAlerts.has(message) ? (
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
              ) : (
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

      {availableAlerts.size > 0 && (
        <Button
          text='Save message settings'
          className='govuk-button'
          onClick={updateMessageSettings}
        />
      )}
    </>
  )

  const floodAreasSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block' id='main-content'>
        Flood areas
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {floodAreas.length > 0 ? (
            <p className='govuk-!-width-one-half'>
              {additionalData.locationName} can get flood messages for these
              areas. You may be also able to link {additionalData.locationName}{' '}
              to nearby flood areas that get flood messages.
            </p>
          ) : (
            <p className='govuk-!-width-one-half'>
              Flood messages are currently unavailable for this location. But
              you may be able to link this location to any nearby flood areas
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

          {floodAreas.length > 0 && (
            <>
              <span className='govuk-caption-m'>
                {floodAreas.length} flood areas
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
                  {floodAreas.map((area, index) => (
                    <tr key={index} className='govuk-table__row'>
                      <td
                        className='govuk-table__cell'
                        style={{
                          verticalAlign: 'middle',
                          padding: '1.5rem 0rem'
                        }}
                      >
                        <Link
                          onClick={(e) => onClick(e, area.code)}
                          className='govuk-link'
                        >
                          {area.name}
                        </Link>
                      </td>
                      <td
                        className='govuk-table__cell'
                        style={{
                          verticalAlign: 'middle',
                          padding: '1.5rem 0rem'
                        }}
                      >
                        {area.linked && (
                          <svg
                            width='26'
                            height='20'
                            viewBox='0 0 26 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M24.0109 10.4792C26.4088 8.08136 26.4088 4.19439 24.0109 1.7965C21.7282 -0.486187 18.0631 -0.609922 15.6311 1.51916L15.3708 1.74957C14.9441 2.12077 14.9015 2.76931 15.2727 3.19598C15.6439 3.62265 16.2924 3.66532 16.7191 3.29411L16.9793 3.06371C18.6007 1.64716 21.0413 1.72823 22.5645 3.25145C24.1602 4.84719 24.1602 7.43708 22.5645 9.0371L17.7303 13.867C16.1345 15.4628 13.5404 15.4628 11.9446 13.867C10.4214 12.3438 10.3404 9.90324 11.7569 8.28189L11.9574 8.05149C12.3286 7.62482 12.286 6.98054 11.8593 6.60507C11.4326 6.2296 10.7884 6.27654 10.4129 6.70321L10.2124 6.93361C8.08754 9.36563 8.21127 13.0307 10.494 15.3134C12.8918 17.7113 16.7788 17.7113 19.1767 15.3134L24.0109 10.4792ZM1.79842 9.5235C-0.599472 11.9214 -0.599472 15.8084 1.79842 18.202C4.08537 20.4889 7.75047 20.6084 10.1825 18.4793L10.4428 18.2489C10.8694 17.8777 10.9121 17.2292 10.5409 16.8025C10.1697 16.3758 9.52115 16.3332 9.09448 16.7044L8.83421 16.9348C7.21286 18.3513 4.77231 18.2702 3.24909 16.747C1.65335 15.1513 1.65335 12.5614 3.24909 10.9614L8.08327 6.13574C9.67902 4.53999 12.2689 4.53999 13.8689 6.13574C15.3921 7.65895 15.4732 10.0995 14.0567 11.7209L13.8263 11.9811C13.4551 12.4078 13.4977 13.0521 13.9244 13.4275C14.3511 13.803 14.9953 13.7561 15.3708 13.3294L15.6012 13.0691C17.7303 10.6371 17.6066 6.97201 15.3239 4.68506C12.926 2.28717 9.03901 2.28717 6.64112 4.68506L1.79842 9.5235Z'
                              fill='black'
                            />
                          </svg>
                        )}{' '}
                        {area.type}
                      </td>
                      <td
                        className='govuk-table__cell'
                        style={{
                          verticalAlign: 'middle',
                          padding: '1.5rem 0rem'
                        }}
                      >
                        {area.severeWarningMessagesCount > 0 && (
                          <span>
                            {area.severeWarningMessagesCount} severe flood
                            warnings
                            <br />
                          </span>
                        )}
                        {area.warningMessagesCount > 0 && (
                          <span>
                            {area.warningMessagesCount} flood warnings
                            <br />
                          </span>
                        )}
                        {area.alertMessagesCount > 0 && (
                          <span>
                            {area.alertMessagesCount} flood alerts
                            <br />
                          </span>
                        )}
                      </td>
                      <td
                        className='govuk-table__cell'
                        style={{
                          verticalAlign: 'middle',
                          padding: '1.5rem 0rem'
                        }}
                      >
                        {area.linked && (
                          <Link
                            className='govuk-link'
                            onClick={() => setUnlinkID(area.linked)}
                          >
                            Unlink
                          </Link>
                        )}
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
      <Helmet>
        <title>{additionalData.locationName ? additionalData.locationName : 'This location'}'s messages - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-0'>
        {isBannerDisplayed && (
          <NotificationBanner
            className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-8'
            title='Success'
            text={
              'Message settings for ' + additionalData.locationName + ' updated'
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

        {/* Only render flood areas section if location is not a predefined boundary */}
        {!isPredefinedBoundary && (
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-full govuk-!-margin-top-9'>
              {floodAreasSection}
            </div>
          </div>
        )}

        {unlinkID && (
          <Popup
            onDelete={() => handleDelete()}
            onClose={() => handleClose()}
            title='Unlink flood area'
            popupText='If you continue flood messages will not be received for this flood area.'
            buttonText='Unlink flood area'
            buttonClass='govuk-button--warning'
          />
        )}
      </main>
    </>
  )
}
