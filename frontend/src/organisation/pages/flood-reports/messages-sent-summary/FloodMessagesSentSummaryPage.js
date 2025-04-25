import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import AlertState from '../../../../common/enums/AlertState'
import { getAdditional } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { geoSafeToWebLocation } from '../../../../common/services/formatters/LocationFormatter'
import { infoUrls } from '../../../routes/info/InfoRoutes'

export default function FloodMessagesSentSummaryPage() {
  const navigate = useNavigate()
  const orgId = useSelector((state) => state.session.orgId)
  // Search filter visibility
  const [data, setData] = useState({
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
    alertsOnly: { locations: 0, alertMessagesCount: 0 },
    noneAvailable: 0,
    messagesTurnedOff: { locations: 0, messagesCount: 0 }
  })
  const [locationsCount, setLocationsCount] = useState(0)

  useEffect(async () => {
    const loadData = async () => {
      setData({
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
        alertsOnly: { locations: 0, alertMessagesCount: 0 },
        noneAvailable: 0,
        messagesTurnedOff: { locations: 0, messagesCount: 0 }
      })

      const { data: partnerId } = await backendCall(
        'data',
        'api/service/get_partner_id'
      )

      const options = {
        states: [AlertState.CURRENT, AlertState.PAST],
        boundingBox: {},
        channels: [],
        partnerId
      }

      // need to filter alertsData.alerts so that it is only last 2 years brought back
      // load alertsData.alerts
      const { data: alertsData } = await backendCall(
        { options },
        'api/alert/list',
        navigate
      )

      // get orgs locations
      const { data: locationsData, errorMessage } = await backendCall(
        { orgId },
        'api/elasticache/list_locations',
        navigate
      )
      setLocationsCount(locationsData.length)

      const locations = []
      if (locationsData && !errorMessage) {
        locationsData.forEach((location) => {
          locations.push(geoSafeToWebLocation(location))
        })
      }
      locations.forEach((location) => {
        const { targetAreas, alertTypes } = location.additionals.other

        // get locations with no available messages
        if (targetAreas.length === 0) {
          setData((prev) => ({
            ...prev,
            noneAvailable: prev.noneAvailable + 1
          }))
          return
        }

        // get locations affected with severe and warning messages only
        if (alertTypes.length === 3) {
          setData((prev) => ({
            ...prev,
            all: {
              ...prev.all,
              locations: prev.all.locations + 1
            }
          }))

          targetAreas?.forEach((ta) => {
            alertsData.alerts.forEach((alert) => {
              const extraInfo = alert.mode.zoneDesc.placemarks[0].extraInfo
              const taCode = getAdditional(extraInfo, 'TA_CODE')

              if (taCode === ta.TA_CODE) {
                // PAUL Chester - please confirm the below validation is ok?
                if (ta.category === 'Severe flood warning') {
                  setData((prev) => ({
                    ...prev,
                    all: {
                      ...prev.all,
                      severeMessagesCount: prev.all.severeMessagesCount + 1
                    }
                  }))
                } else if (ta.category === 'Flood warning') {
                  setData((prev) => ({
                    ...prev,
                    all: {
                      ...prev.all,
                      warningMessagesCount: prev.all.warningMessagesCount + 1
                    }
                  }))
                } else if (ta.category === 'Alert flood warning') {
                  setData((prev) => ({
                    ...prev,
                    all: {
                      ...prev.all,
                      alertMessagesCount: prev.all.alertMessagesCount + 1
                    }
                  }))
                }
              }
            })
          })
          return
        }

        // get locations affected with severe and warning messages only
        if (alertTypes.length === 2) {
          setData((prev) => ({
            ...prev,
            severeWarningsOnly: {
              ...prev.severeWarningsOnly,
              locations: prev.severeWarningsOnly.locations + 1
            }
          }))

          targetAreas?.forEach((ta) => {
            alertsData.alerts.forEach((alert) => {
              const extraInfo = alert.mode.zoneDesc.placemarks[0].extraInfo
              const taCode = getAdditional(extraInfo, 'TA_CODE')

              if (taCode === ta.TA_CODE) {
                // PAUL Chester - please confirm the below validation is ok?
                if (ta.category === 'Severe flood warning') {
                  setData((prev) => ({
                    ...prev,
                    severeWarningsOnly: {
                      ...prev.severeWarningsOnly,
                      severeMessagesCount:
                        prev.severeWarningsOnly.severeMessagesCount + 1
                    }
                  }))
                } else if (ta.category === 'Flood warning') {
                  setData((prev) => ({
                    ...prev,
                    severeWarningsOnly: {
                      ...prev.severeWarningsOnly,
                      warningMessagesCount:
                        prev.severeWarningsOnly.warningMessagesCount + 1
                    }
                  }))
                }
              }
            })
          })
          return
        }

        // get locations affected with  alert messages only
        if (alertTypes.length === 1) {
          setData((prev) => ({
            ...prev,
            alertsOnly: {
              ...prev.alertsOnly,
              locations: prev.alertsOnly.locations + 1
            }
          }))

          targetAreas?.forEach((ta) => {
            alertsData.alerts.forEach((alert) => {
              const extraInfo = alert.mode.zoneDesc.placemarks[0].extraInfo
              const taCode = getAdditional(extraInfo, 'TA_CODE')

              if (taCode === ta.TA_CODE) {
                setData((prev) => ({
                  ...prev,
                  alertsOnly: {
                    ...prev.alertsOnly,
                    alertMessagesCount: prev.alertsOnly.alertMessagesCount + 1
                  }
                }))
              }
            })
          })
          return
        }

        // get locations affected with messages turned off
        if (alertTypes.length === 0) {
          setData((prev) => ({
            ...prev,
            messagesTurnedOff: {
              ...prev.messagesTurnedOff,
              locations: prev.messagesTurnedOff.locations + 1
            }
          }))

          targetAreas?.forEach((ta) => {
            alertsData.alerts.forEach((alert) => {
              const extraInfo = alert.mode.zoneDesc.placemarks[0].extraInfo
              const taCode = getAdditional(extraInfo, 'TA_CODE')

              if (taCode === ta.TA_CODE) {
                setData((prev) => ({
                  ...prev,
                  messagesTurnedOff: {
                    ...prev.messagesTurnedOff,
                    messagesCount: prev.messagesTurnedOff.messagesCount + 1
                  }
                }))
              }
            })
          })
          return
        }
      })
    }

    loadData()
  }, [])

  const locationTableMessagesBody = () => (
    <>
      <tbody className='govuk-table__body'>
        <tr className='govuk-table__row'>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            <Link to='/' className='govuk-link'>
              {data.all.locations}
            </Link>
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
            <Link to='/' className='govuk-link'>
              {data.severeWarningsOnly.locations}
            </Link>
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
            <Link to='/' className='govuk-link'>
              {data.alertsOnly.locations}
            </Link>
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
            <Link to='/' className='govuk-link'>
              {data.noneAvailable}
            </Link>
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            None available
            <br />
            All message types (turned off)
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            {data.noneAvailable}
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            <Link to='/' className='govuk-link'>
              {data.messagesTurnedOff.locations}
            </Link>
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

  console.log(data)

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
  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
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
