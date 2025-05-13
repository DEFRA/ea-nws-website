import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import { backendCall } from '../../../../common/services/BackendService'
import { infoUrls } from '../../../routes/info/InfoRoutes'

export default function FloodMessagesSentSummaryPage() {
  const navigate = useNavigate()
  const orgId = useSelector((state) => state.session.orgId)
  const [alertData, setAlertData] = useState()
  const [totalLocations, setTotalLocations] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const alertKey = orgId + ':alertLocations'
      const { data } = await backendCall(
        { key: alertKey },
        'api/elasticache/get_data',
        navigate
      )
      data && setAlertData(data)
    }
    getData()
  }, [])

  useEffect(() => {
    setTotalLocations(
      alertData?.severeWarningAlert.length +
        alertData?.severeWarning.length +
        alertData?.alert.length +
        alertData?.noAlert.length
    )
  }, [alertData])

  const locationTableMessagesBody = (alertData) => (
    <>
      <tbody className='govuk-table__body'>
        <tr className='govuk-table__row'>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            <Link to='/' className='govuk-link'>
              {alertData?.severeWarningAlert.length}
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
            5<br />
            795
            <br />
            1,484
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            <Link to='/' className='govuk-link'>
              {alertData?.severeWarning.length}
            </Link>
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            Flood warnings
            <br />
            Flood alerts
          </td>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            0<br />5
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            <Link to='/' className='govuk-link'>
              {alertData?.alert.length}
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
            100
          </td>
        </tr>
      </tbody>
    </>
  )

  /* ToDo get data for no alerts properly and how many messages for each
  however this feature cant be implimented yet so dummy data and hard code
  needed for this table */
  const locationTableNoMessages = (alertData) => (
    <>
      <tbody className='govuk-table__body'>
        <tr className='govuk-table__row'>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            <Link to='/' className='govuk-link'>
              {alertData?.noAlert.length - 1}
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
            0
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td
            className='govuk-table__cell'
            style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
          >
            <Link to='/' className='govuk-link'>
              1
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
            16
          </td>
        </tr>
      </tbody>
    </>
  )

  const locationTableHead = (
    title,
    paragraph,
    locationTableBody,
    numberMessages
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
        {numberMessages} of {totalLocations} locations
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
      <Helmet>
        <title>Summary of Flood Messages Sent - Next Warning Service GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>Summary of flood messages sent</h1>
            <div className='govuk-body'>
              {locationTableHead(
                'Locations that get flood messages',
                paragraphMessages,
                locationTableMessagesBody(alertData),
                totalLocations - alertData?.noAlert.length
              )}
              {locationTableHead(
                'Locations that will not get flood messages',
                paragraphNoMessages,
                locationTableNoMessages(alertData),
                alertData?.noAlert.length
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
