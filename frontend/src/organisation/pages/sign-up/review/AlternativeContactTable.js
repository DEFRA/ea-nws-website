import React from 'react'
import { Link } from 'react-router-dom'
export default function ContactReviewTable () {
  return (
    <>
      <h3 className='govuk-heading-m govuk-!-margin-top-9'>
        Alternative Contact
      </h3>
      <table className='govuk-table'>
        <tr className='govuk-table__row'>
          <td class='govuk-table__header  govuk-!-width-one-half'>Name</td>
          <td className='govuk-table__cell  govuk-!-width-full'>Joan Smith</td>
          <td className='govuk-table__cell'>
            <Link to='/' className='govuk-link'>
              Change
            </Link>
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td class='govuk-table__header  govuk-!-width-one-half'>
            Email address
          </td>
          <td className='govuk-table__cell  govuk-!-width-full'>
            j.smith@floodinc.com
          </td>
          <td className='govuk-table__cell'>
            <Link to='/' className='govuk-link'>
              Change
            </Link>
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td class='govuk-table__header  govuk-!-width-one-half'>
            Telephone number
          </td>
          <td className='govuk-table__cell  govuk-!-width-full'>
            0207 1739372
          </td>
          <td className='govuk-table__cell'>
            <Link to='/' className='govuk-link'>
              Change
            </Link>
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td class='govuk-table__header  govuk-!-width-one-half'>
            Job title (optional)
          </td>
          <td className='govuk-table__cell  govuk-!-width-full'>IT Director</td>
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
