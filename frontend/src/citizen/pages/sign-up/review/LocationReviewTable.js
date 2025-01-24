import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setLocationToBeChanged } from '../../../../common/redux/userSlice'

export default function LocationReviewTable ({ locations }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const selectLocationToBeChanged = (event, location) => {
    event.preventDefault()
    dispatch(setLocationToBeChanged(location))
    navigate('/signup/review/change-location-search')
  }

  return (
    <div className='govuk-!-padding-bottom-4'>
      <h3 className='govuk-heading-m'>Location you selected</h3>
      {locations.map && (
        <table className='govuk-table'>
          <tbody className='govuk-table__body' />
          {locations.map((location, index) => (
            <tr key={index} className='govuk-table__row'>
              <td className='govuk-table__header'>Address</td>
              <td className='govuk-table__cell govuk-!-width-full'>
                {location.address}
              </td>

              <td className='govuk-table__cell'>
                <Link
                  onClick={(e) => selectLocationToBeChanged(e, location)}
                  className='govuk-link'
                >
                  Change
                </Link>
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  )
}
