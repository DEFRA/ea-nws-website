import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ContactReviewTable({ profile, organisation }) {
  const navigate = useNavigate()

  return (
    <>
      <h3 className='govuk-heading-m'>Main administrator</h3>
      <table className='govuk-table'>
        <tr className='govuk-table__row'>
          <td class='govuk-table__header  govuk-!-width-one-half'>Name</td>
          <td className='govuk-table__cell  govuk-!-width-full'>
            {organisation.mainadministrator.name}
          </td>
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
            {organisation.mainadministrator.emailaddress}
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
