import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function LocationReviewTable() {
  const navigate = useNavigate()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )

  const selectLocationToBeChanged = (event) => {
    event.preventDefault()
    navigate('/signup/review/change-location-search')
  }

  return (
    <div className='govuk-!-padding-bottom-4'>
      <h2 className='govuk-heading-m'>Location you selected</h2>
      {selectedLocation && (
        <table className='govuk-table'>
          <tbody className='govuk-table__body'>
            <tr className='govuk-table__row'>
              <th
                className='govuk-table__header govuk-!-width-one-third'
                scope='row'
              >
                Location
              </th>
              <td className='govuk-table__cell govuk-!-width-full'>
                {selectedLocation.address}
              </td>

              <td className='govuk-table__cell'>
                <Link
                  onClick={(e) => selectLocationToBeChanged(e)}
                  className='govuk-link'
                  style={{ cursor: 'pointer' }}
                  aria-label={`Change address for location ${selectedLocation.address}`}
                >
                  Change
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}
