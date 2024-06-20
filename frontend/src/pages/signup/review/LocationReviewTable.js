import React from 'react'
import { Link } from 'react-router-dom'

export default function LocationReviewTable ({ locations }) {
  return (
    <>
      <h3 className='govuk-heading-m'>Location you selected</h3>
      {locations.length > 0
        ? (
          <table className='govuk-table'>
            <tbody className='govuk-table__body' />
            {locations.map((location, index) => (
              <tr key={index} className='govuk-table__row'>
                <td
                  scope='row'
                  class='govuk-table__header  govuk-!-width-one-half'
                >
                  Address
                </td>
                <td className='govuk-table__cell  govuk-!-width-full'>
                  {location.address}
                </td>

                <td className='govuk-table__cell'>
                  <Link to='/' className='govuk-link'>
                    Change
                  </Link>
                </td>
              </tr>
            ))}
          </table>
          )
        : null}
    </>
  )
}
