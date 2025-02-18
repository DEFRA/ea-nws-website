import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import linkIcon from '../../../../../common/assets/images/link.svg'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Radio from '../../../../../common/components/gov-uk/Radio'
import AlertType from '../../../../../common/enums/AlertType'
import { getLocationAdditionals, getLocationOtherAdditional, setCurrentLocation, setCurrentLocationAlertTypes } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { infoUrls } from '../../../../routes/info/InfoRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import LocationHeader from './location-information-components/LocationHeader'

export default function LocationMessagesPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [linkedTAs, setLinkedTAs] = useState([])
  const orgId = useSelector((state) => state.session.orgId)

  const [isBannerDisplayed, setIsBannerDisplayed] = useState(false)
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const additionalData = useSelector(
    (state) => getLocationAdditionals(state)
  )
  
  const alertTypes = additionalData.alertTypes
  const allAlertTypes = [AlertType.SEVERE_FLOOD_WARNING, AlertType.FLOOD_WARNING, AlertType.FLOOD_ALERT]

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

  useEffect(() => {
    const getData = async () => {
      const childrenIDs = getLocationOtherAdditional(currentLocation.additionals, 'childrenIDs')?.map((child) => child.id) || []
      for (const taID of childrenIDs) {
        const alertKey = orgId + ':t_POIS:' + taID
        const { data } = await backendCall(
          { key: alertKey },
          'api/elasticache/get_data',
          navigate
        )
        data && setLinkedTAs((prev) => [...prev, data])
      }
    }
    getData()
  }, [])

  const onClick = (e, location) => {
      e.preventDefault()
      dispatch(setCurrentLocation(location))
      // Will need a different page to view the nearby area but no figma?
      navigate(orgManageLocationsUrls.view.viewLocation)
  }
  

  const floodAreasInputs = [
    {
      areaName:
        'Properties closest to the River Thames from All Saints Church, Bisham to Little Marlow',
      areaType: 'Severe and flood warning',
      messagesSent: ['1 severe flood warning', '5 flood warnings']
    },
    {
      areaName: 'River Thames at Bisham village and Marlow town',
      areaType: 'Severe and flood warning',
      messagesSent: ['0 severe flood warnings', '2 flood warnings']
    },
    {
      areaName: 'River Thames at Hurley and Harleyford',
      areaType: 'Severe and flood warning',
      messagesSent: ['0 severe flood warnings', '2 flood warnings']
    },
    {
      areaName: 'River Thames from Hurley to Cookham',
      areaType: 'Flood alert',
      messagesSent: ['15 flood alerts']
    }
  ]

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
      {floodAreasInputs.length > 0
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
              {floodAreasInputs.length > 0 && alertTypes
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
            Flood messages are currently unavailable for this location. <br />
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

      {floodAreasInputs.length > 0 && (
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
                    {detail.messagesSent.map((message, idx) => (
                      <div key={idx}>{message}</div>
                    ))}
                  </td>
                  <td
                    className='govuk-table__cell'
                    style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                  >
                    {detail.areaType === 'Flood alert'
                      ? (
                        <Link className='govuk-link'>Unlink</Link>
                        )
                      : null}
                  </td>
                </tr>
              ))}
              {linkedTAs.map((linkedTA, index) => (
                <tr key={index} className='govuk-table__row'>
                  <td
                    className='govuk-table__cell'
                    style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                  >
                    <Link onClick={(e) => onClick(e, linkedTA)} className='govuk-link'>
                      {linkedTA.address}
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
                  </td>
                  <td
                    className='govuk-table__cell'
                    style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                  >
                    {/* {detail.messagesSent.map((message, idx) => (
                      <div key={idx}>{message}</div>
                    ))} */}
                  </td>
                  <td
                    className='govuk-table__cell'
                    style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                  >
                    {/* {detail.areaType === 'Flood alert'
                      ? (
                        <Link className='govuk-link'>Unlink</Link>
                        )
                      : null} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <Button
        imageSrc={linkIcon}
        text='Link to nearby flood areas'
        className='govuk-button govuk-button--secondary'
        // TODO: Add link to nearby flood areas
        onClick={() => navigate(orgManageLocationsUrls.add.linkToTargetArea)}
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
