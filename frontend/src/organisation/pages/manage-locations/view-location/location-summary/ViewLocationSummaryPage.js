import React from 'react'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { infoUrls } from '../../../../routes/info/InfoRoutes'
import BackLink from '../../../../../common/components/custom/BackLink'
export default function ViewLocationSummaryPage () {
  const navigate = useNavigate()

  const locationThatWillGetMessagesInputs = [
    {
      numberLocation:
        '1,799',
      messageType: ['Severe flood warnings', 'Flood warnings', 'Flood alerts'],
      messagesSent: ['5', '795', '1,484']
    },
    {
      numberLocation: '1',
      messageType: ['Severe flood warning', 'Flood warnings'],
      messagesSent: ['0', '5']
    },
    {
      numberLocation: '120',
      messageType: ['Flood alerts only'],
      messagesSent: ['100']
    }
  ]

  const locationThatDoesNotGetMessagesInputs = [
    {
      numberLocation:
          '80',
      messageType: ['None available'],
      messagesSent: ['0']
    },
    {
      numberLocation: '1',
      messageType: ['All messages types (turned off)'],
      messagesSent: ['16']
    }
  ]

  const locationTable = (title, tableData) => (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-margin-top-5 govuk-!-display-inline-block'>
        {title}
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3 section-break-bold' />
      <p className='govuk-!-margin-bottom-5'>
        This is a summary of how many locations get each of the different types of flood messages.
        Not all flood messages are available for some locations.
      </p>
      <Link to={infoUrls.floodTypes} className='govuk-link '>
        What are the different types of flood messages?
      </Link>
      {/* ToDo change this so its not hardcoded */}
      <p className='govuk-!-margin-top-5'>1,920 of 2,000 locations</p>

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
        <tbody className='govuk-table__body'>
          {tableData.map((item, index) => (
            <tr key={index} className='govuk-table__row'>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
              >
                <Link to='/' className='govuk-link'>
                  {item.numberLocation}
                </Link>
              </td>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
              >
                {item.messageType}
              </td>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
              >
                {item.messagesSent.map((message, idx) => (
                  <div key={idx}>{message}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>Summary of flood messages sent</h1>
            <div className='govuk-body'>
              {locationTable('Locations that get flood messages', locationThatWillGetMessagesInputs)}
              {locationTable('Locations that will not get flood messages', locationThatDoesNotGetMessagesInputs)}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
