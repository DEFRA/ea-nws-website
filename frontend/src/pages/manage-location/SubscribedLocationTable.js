import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import Details from '../../gov-uk-components/Details'
import Pagination from '../../gov-uk-components/Pagination'

export default function SubscribedLocationTable () {
  const [currentPage, setCurrentPage] = useState(1)
  const locationsPerPage = 10

  const profile = useSelector((state) => state.session.profile)
  const locations = profile.pois

  const displayedLocations = locations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )

  const navigate = useNavigate()

  const detailsMessage = (
    <div>
      <p>You must keep at least one location on your account.</p>
      <p>
        <Link to='/manage-locations/add/search' className='govuk-link'>
          Add a new location
        </Link>
        &nbsp;before removing any you do not need.
      </p>
      <p>
        Or you could&nbsp;
        <Link to='/deleteaccount' className='govuk-link'>
          Delete your account
        </Link>
        &nbsp;instead.
      </p>
    </div>
  )

  const locationTable = () => {
    const viewColumn = (location) => {
      return (
        <td className='govuk-table__cell'>
          <Link
            to='/manage-locations/view'
            state={{
              address: location.address
            }}
            className='govuk-link'
          >
            View
          </Link>
        </td>
      )
    }

    const removeColumn = (location) => {
      return (
        <td className='govuk-table__cell'>
          <Link
            to='/manage-locations/remove'
            state={{
              address: location.address,
              coordinates: location.coordinates
            }}
            className='govuk-link'
          >
            Remove
          </Link>
        </td>
      )
    }

    const addressColumn = (location) => {
      return (
        <td className='govuk-table__cell govuk-!-width-full'>
          {location.address}
        </td>
      )
    }

    const tableBody = () => {
      return (
        <tbody className='govuk-table__body'>
          {displayedLocations.map((location, index) => (
            <tr key={index} className='govuk-table__row'>
              {addressColumn(location)}
              {locations.length === 1 && <td className='govuk-table__cell' />}
              {viewColumn(location)}
              {locations.length > 1 && removeColumn(location)}
            </tr>
          ))}
        </tbody>
      )
    }

    const tableHead = () => {
      return (
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th colSpan='3' scope='colspan' className='govuk-table__header'>
              {'Your locations (' + locations.length + ')'}
            </th>
          </tr>
        </thead>
      )
    }

    return (
      <table className='govuk-table'>
        {tableHead()}
        {tableBody()}
      </table>
    )
  }

  return (
    <>
      <div div className='govuk-body'>
        {locations.length > 0 && locationTable()}
        <Pagination
          totalPages={Math.ceil(locations.length / locationsPerPage)}
          onPageChange={(val) => setCurrentPage(val)}
        />
        <Button
          text='Add new location'
          className='govuk-button govuk-button--secondary'
          onClick={() => navigate('/manage-locations/add/search')}
        />
        {locations.length === 1 && (
          <Details
            title='If you want to remove this location'
            text={detailsMessage}
          />
        )}
      </div>
    </>
  )
}
