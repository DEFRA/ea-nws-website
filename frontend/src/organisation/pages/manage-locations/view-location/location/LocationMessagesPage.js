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
import { getLocationAdditionals, getLocationOtherAdditional, setCurrentLocation, setCurrentLocationAlertTypes } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { csvToJson } from '../../../../../common/services/CsvToJson'
import { getFloodAreas, getFloodAreasFromShape } from '../../../../../common/services/WfsFloodDataService'
import { infoUrls } from '../../../../routes/info/InfoRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import LocationHeader from './location-information-components/LocationHeader'

export default function LocationMessagesPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [linkedTAs, setLinkedTAs] = useState([])
  const orgId = useSelector((state) => state.session.orgId)

  const [isBannerDisplayed, setIsBannerDisplayed] = useState(false)

  const [loading, setLoading] = useState(true)
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const additionalData = useSelector((state) => getLocationAdditionals(state))

  const [withinAreas, setWithinAreas] = useState(null)
  const [floodAreasInputs, setFloodAreasInputs] = useState([])
  const [floodHistoryUrl, setHistoryUrl] = useState('')
  const [floodHistoryData, setFloodHistoryData] = useState(null)
  const [floodCounts, setFloodCounts] = useState([])
  const alertTypes = getLocationOtherAdditional(
    additionalData,
    'alertTypes'
  )
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
    let result
    if (additionalData.location_data_type === LocationDataType.X_AND_Y_COORDS || currentLocation.geometry === null) {
      result = await getFloodAreas(
        currentLocation.coordinates.latitude, currentLocation.coordinates.longitude
      )
    } else {
      const geoJson = JSON.parse(currentLocation.geometry.geoJson)
      result = await getFloodAreasFromShape(
        geoJson
      )
    }
    setWithinAreas(result)
  }

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

  const setHistoricalData = (area, type) => {
    const twoYearsAgo = moment().subtract(2, 'years')
    if (area) {
      const taCode = area.properties.TA_CODE

      const filteredData = floodHistoryData.filter(
        (alert) =>
          alert['TA Code'] === taCode &&
          alert['lookup category'] === type &&
          (moment(alert.Approved
            , 'DD/MM/YYYY HH:MM:SS')).format('DD/MM/YYYY') > twoYearsAgo.format('DD/MM/YYYY'))
      setFloodCounts((prev) => [...prev, { TA_CODE: taCode, count: filteredData.length }])
    }
  }

  useEffect(() => {
    const processFloodData = () => {
      if (floodHistoryData && hasFetchedArea) {
        if (withinAreas.length > 0) {
          withinAreas.forEach((area) => setHistoricalData(area, area.properties.category))
        }
      }
    }
    processFloodData()
  }, [floodHistoryData, withinAreas, hasFetchedArea])

  useEffect(() => {
    const populateInputs = (withinAreas) => {
      const updatedFloodAreas = []
      for (const area of withinAreas) {
        const floodCount = floodCounts.find((area) => area.TA_CODE === taCode).count
        const taCode = area.properties.TA_CODE
        let messageSent
        switch (area.properties.category) {
          case 'Flood Warning Rapid Response':
          case 'Flood Warning':
            messageSent = [
              `${floodCount} severe flood warning${floodCount > 1 ? 's' : ''}`,
              `${floodCount} flood warning${floodCount > 1 ? 's' : ''}`]
            break
          case 'Flood Alert':
            messageSent = [
              `${floodCount} flood alert${floodCount > 1 ? 's' : ''}`
            ]
            break
          default:
            messageSent = ['']
            break
        }

        updatedFloodAreas.push({
          areaName: area.properties.TA_Name,
          areaType: `${area.properties.category === 'Flood Warning Rapid Response' ? 'Severe flood warning' : area.properties.category === 'Flood Warning' ? 'Flood warning' : 'Flood alert'} area`,
          messagesSent: messageSent
        })
      }

      setFloodAreasInputs(updatedFloodAreas)
    }

    if (withinAreas) {
      populateInputs(withinAreas)
    }
  }, [withinAreas])

  useEffect(() => {
    if ((hasFetchedArea) || (floodAreasInputs.length > 0)) {
      setLoading(false)
    }
  }, [withinAreas, floodAreasInputs, floodCounts, hasFetchedArea])

  // it should reload the surrounding areas if the location is changed
  useEffect(() => {
    hasFetchedArea.current = false
  }, [currentLocation])

  useEffect(() => {
    const fetchAreas = async () => {
      if (currentLocation && (currentLocation.coordinates || currentLocation.geometry || currentLocation.geocode)) {
        if (!hasFetchedArea.current) {
          await getWithinAreas()
          if (withinAreas) {
            hasFetchedArea.current = true
          }
        }
      }
    }
    fetchAreas()
  }, [currentLocation, additionalData, withinAreas])

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

  const handleSubmit = () => {
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
