import React from 'react'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import BackLink from '../../../../../common/components/custom/BackLink'
export default function ViewLocationSummaryPage () {
  const navigate = useNavigate()

  const locationThatWillGetMessagesTable = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Locations that get flood messages
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3 section-break-bold' />
      <p className='govuk-!-margin-bottom-5'>
        This is a summary of how many locations get each of the different types of flood messages.
        Not all flood messages are available for some locations.
      </p>
      <Link to='/' className='govuk-link '>
        What are the different types of flood messages?
      </Link>
      {/* ToDo change this so its not hardcoded*/}
      <p className='govuk-!-margin-top-5'>11100 locations of 2000</p> 

      <table className='govuk-table govuk-table--small-text-until-tablet'>
            <thead className='govuk-table__head'>
              <tr className='govuk-table__row'>
                <th scope='col' className='govuk-table__header'>
                  Number of locations
                </th>
                <th scope='col' className='govuk-table__header'>
                  Flood messages
                  <br/> that will be sent
                </th>
                <th scope='col' className='govuk-table__header'>
                  Number of messages 
                  <br /> sent in the last 2 years
                </th>
                <th scope='col' className='govuk-table__header' />
              </tr>
            </thead>
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
            <h1 className = 'govuk-heading-l'>Summary of flood messages sent</h1>
            <div className='govuk-body'>
            {locationThatWillGetMessagesTable}
            </div>
            
          </div>
        </div>
      </main>
    </>
  )
}
