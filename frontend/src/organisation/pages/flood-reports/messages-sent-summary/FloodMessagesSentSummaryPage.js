import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import AlertState from '../../../../common/enums/AlertState'
import AlertType from '../../../../common/enums/AlertType'
import { getAdditional } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { geoSafeToWebLocation } from '../../../../common/services/formatters/LocationFormatter'
import { infoUrls } from '../../../routes/info/InfoRoutes'

export default function FloodMessagesSentSummaryPage() {
  const navigate = useNavigate()
  const orgId = useSelector((state) => state.session.orgId)
  const initialData = {
    all: {
      locations: 0,
      severeMessagesCount: 0,
      warningMessagesCount: 0,
      alertMessagesCount: 0
    },
    severeWarningsOnly: {
      locations: 0,
      severeMessagesCount: 0,
      warningMessagesCount: 0
    },
    alertsOnly: {
      locations: 0,
      alertMessagesCount: 0
    },
    noneAvailable: 0,
    messagesTurnedOff: {
      locations: 0,
      messagesCount: 0
    }
  }
  const [data, setData] = useState(initialData)
  const [locationsCount, setLocationsCount] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      setData(initialData)

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

      // get orgs locations
      const { data: locationsData, errorMessage } = await backendCall(
        { orgId },
        'api/elasticache/list_locations',
        navigate
      )
      setLocationsCount(locationsData?.length || 0)

      const locations = locationsData?.map(geoSafeToWebLocation) || []
      processLocations(locations, alertsData?.alerts || [])
    }

    loadData()
  }, [])

  const processLocations = (locations, alerts) => {
    locations.forEach((location) => {
      const { targetAreas, alertTypes } = location.additionals.other

      if (targetAreas.length === 0) {
        setData((prev) => ({
          ...prev,
          noneAvailable: prev.noneAvailable + 1
        }))
        return
      }

      processLocationByAlertTypes(alertTypes, targetAreas, alerts)
    })
  }

  const processLocationByAlertTypes = (
    locationsMessageSettings,
    targetAreas,
    alerts
  ) => {
    // all alert types
    if (
      [
        AlertType.SEVERE_FLOOD_WARNING,
        AlertType.FLOOD_WARNING,
        AlertType.FLOOD_ALERT
      ].every((type) => locationsMessageSettings.includes(type))
    ) {
      updateLocationStats('all', targetAreas, alerts)
    }
    // severe and warning messages only
    else if (
      [AlertType.SEVERE_FLOOD_WARNING, AlertType.FLOOD_WARNING].every((type) =>
        locationsMessageSettings.includes(type)
      )
    ) {
      updateLocationStats('severeWarningsOnly', targetAreas, alerts)
    }
    // alert messages only
    else if (locationsMessageSettings.includes(AlertType.FLOOD_ALERT)) {
      updateLocationStats('alertsOnly', targetAreas, alerts)
    }
    // messages turned off
    else if (
      [
        AlertType.SEVERE_FLOOD_WARNING,
        AlertType.FLOOD_WARNING,
        AlertType.FLOOD_ALERT
      ].every((type) => !locationsMessageSettings.includes(type))
    ) {
      updateLocationStats('messagesTurnedOff', targetAreas, alerts)
    }
  }

  const updateLocationStats = (category, targetAreas, alerts) => {
    setData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        locations: prev[category].locations + 1
      }
    }))

    // process all target areas for this location
    targetAreas
      ?.filter((targetArea) => {
        if (category === 'all' || category === 'messagesTurnedOff') {
          return (
            targetArea.category.includes('Warning') ||
            targetArea.category.includes('Alert')
          )
        } else if (category === 'severeWarningsOnly') {
          return targetArea.category.includes('Warning')
        } else if (category === 'alertsOnly') {
          return targetArea.category.includes('Alert')
        }
      })
      .forEach((targetArea) => {
        alerts
          .filter((alert) => {
            if (category === 'all' || category === 'messagesTurnedOff') {
              return [
                AlertType.SEVERE_FLOOD_WARNING,
                AlertType.FLOOD_WARNING,
                AlertType.FLOOD_ALERT
              ].some((type) => alert.type === type)
            } else if (category === 'severeWarningsOnly') {
              return [
                AlertType.SEVERE_FLOOD_WARNING,
                AlertType.FLOOD_WARNING
              ].some((type) => alert.type === type)
            } else if (category === 'alertsOnly') {
              return alert.type.includes(AlertType.FLOOD_ALERT)
            }
          })
          .forEach((alert) => {
            const extraInfo = alert.mode.zoneDesc.placemarks[0].extraInfo
            const taCode = getAdditional(extraInfo, 'TA_CODE')

            if (taCode === targetArea.TA_CODE) {
              updateMessageCounts(category, alert.type)
            }
          })
      })
  }

  const updateMessageCounts = (category, alertLevel) => {
    setData((prev) => {
      const newData = { ...prev }

      if (category === 'all') {
        if (alertLevel === AlertType.SEVERE_FLOOD_WARNING) {
          newData.all.severeMessagesCount++
        } else if (alertLevel === AlertType.FLOOD_WARNING) {
          newData.all.warningMessagesCount++
        } else if (alertLevel === AlertType.FLOOD_ALERT) {
          newData.all.alertMessagesCount++
        }
      } else if (category === 'severeWarningsOnly') {
        if (alertLevel === AlertType.SEVERE_FLOOD_WARNING) {
          newData.severeWarningsOnly.severeMessagesCount++
        } else if (alertLevel === AlertType.FLOOD_WARNING) {
          newData.severeWarningsOnly.warningMessagesCount++
        }
      } else if (category === 'alertsOnly') {
        newData.alertsOnly.alertMessagesCount++
      } else if (category === 'messagesTurnedOff') {
        newData.messagesTurnedOff.messagesCount++
      }

      return newData
    })
  }

  const locationTableMessagesBody = () => (
    <>
      <tbody className='govuk-table__body'>
        <tr className='govuk-table__row'>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            <p>{data.all.locations}</p>
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            Severe flood warnings
            <br />
            Flood warnings
            <br />
            Flood alerts
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            {data.all.severeMessagesCount}
            <br />
            {data.all.warningMessagesCount}
            <br />
            {data.all.alertMessagesCount}
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            <p>{data.severeWarningsOnly.locations}</p>
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            Severe flood warnings
            <br />
            Flood warnings
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            {data.severeWarningsOnly.severeMessagesCount}
            <br />
            {data.severeWarningsOnly.warningMessagesCount}
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            <p>{data.alertsOnly.locations}</p>
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            Flood alerts only
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            {data.alertsOnly.alertMessagesCount}
          </td>
        </tr>
      </tbody>
    </>
  )

  const locationTableNoMessages = () => (
    <>
      <tbody className='govuk-table__body'>
        <tr className='govuk-table__row'>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            <p>{data.noneAvailable}</p>
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            None available
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            0
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            <p>{data.messagesTurnedOff.locations}</p>
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            All message types (turned off)
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            {data.messagesTurnedOff.messagesCount}
          </td>
        </tr>
      </tbody>
    </>
  )

  const locationTableHead = (
    title,
    paragraph,
    locationTableBody,
    locationsAffectedCount
  ) => (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-margin-top-5 govuk-!-display-inline-block'>
        {title}
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3 section-break-bold' />
      <p className='govuk-!-margin-bottom-5'>{paragraph}</p>
      <Link to={infoUrls.floodTypes} className='govuk-link '>
        What are the different types of flood messages?
      </Link>
      <p className='govuk-!-margin-top-5'>
        {locationsAffectedCount} of {locationsCount} locations
      </p>

      <table className='govuk-table govuk-table--small-text-until-tablet'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th scope='col' className='govuk-table__header'>
              Number of locations
            </th>
            <th scope='col' className='govuk-table__header'>
              Flood messages
              <br /> that will be sent
            </th>
            <th scope='col' className='govuk-table__header'>
              Number of messages
              <br /> sent in the last 2 years
            </th>
            <th scope='col' className='govuk-table__header' />
          </tr>
        </thead>
        {locationTableBody}
      </table>
    </>
  )
  const paragraphMessages = (
    <>
      This is a summary of how many locations get each of the different types of{' '}
      <br /> flood messages. Not all flood messages are available for some
      locations.
    </>
  )

  const paragraphNoMessages = (
    <>
      This is a summary of locations that will not get messages. This is because{' '}
      <br />
      no messages are available or messages types have been turned off.
    </>
  )

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>Summary of flood messages sent - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>Summary of flood messages sent</h1>
            <div className='govuk-body'>
              {locationTableHead(
                'Locations that get flood messages',
                paragraphMessages,
                locationTableMessagesBody(),
                data.all.locations +
                  data.severeWarningsOnly.locations +
                  data.alertsOnly.locations
              )}
              {locationTableHead(
                'Locations that will not get flood messages',
                paragraphNoMessages,
                locationTableNoMessages(),
                data.noneAvailable + data.messagesTurnedOff.locations
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
