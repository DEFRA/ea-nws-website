import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactReviewTable() {
  return (
    <>
      <h3 className='govuk-heading-m govuk-!-margin-top-9'>
        Main administrator
      </h3>
      <table className='govuk-table'>
        <tr className='govuk-table__row'>
          <td class='govuk-table__header  govuk-!-width-one-quarter'>Name</td>
          <td className='govuk-table__cell  govuk-!-width-full'>
            Frank Waters
          </td>
          <td className='govuk-table__cell'>
            <Link to='/' className='govuk-link'>
              Change
            </Link>
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td class='govuk-table__header  govuk-!-width-one-quarter'>
            Email address
          </td>
          <td className='govuk-table__cell  govuk-!-width-full'>
            frank.waters@floodinc.com
          </td>
          <td className='govuk-table__cell'>
            <Link to='/' className='govuk-link'>
              Change
            </Link>
          </td>
        </tr>
        <br />
      </table>
    </>
  )
}
