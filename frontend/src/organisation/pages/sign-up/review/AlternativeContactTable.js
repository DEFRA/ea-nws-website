import React from 'react'
import { Link } from 'react-router-dom'
export default function ContactReviewTable({ alternativeContact }) {
  const fullName = `${alternativeContact.firstName} ${alternativeContact.lastName}`
  return (
    <>
      <h3 className='govuk-heading-m govuk-!-margin-top-9'>
        Alternative contact
      </h3>
      <table className='govuk-table'>
        <tr className='govuk-table__row'>
          <td class='govuk-table__header  govuk-!-width-one-quarter'>Name</td>
          <td className='govuk-table__cell  govuk-!-width-full'>{fullName}</td>
          <td className='govuk-table__cell'>
            {/* TODO - Add correct link when implemented */}
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
            {alternativeContact.email}
          </td>
          <td className='govuk-table__cell'>
            {/* TODO - Add correct link when implemented */}
            <Link to='/' className='govuk-link'>
              Change
            </Link>
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td class='govuk-table__header  govuk-!-width-one-quarter'>
            Telephone number
          </td>
          <td className='govuk-table__cell  govuk-!-width-full'>
            {alternativeContact.telephone}
          </td>
          <td className='govuk-table__cell'>
            {/* TODO - Add correct link when implemented */}
            <Link to='/' className='govuk-link'>
              Change
            </Link>
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td class='govuk-table__header  govuk-!-width-one-quarter'>
            Job title (optional)
          </td>
          <td className='govuk-table__cell  govuk-!-width-full'>
            {alternativeContact.jobTitle
              ? `${alternativeContact.jobTitle}`
              : '-'}
          </td>
          <td className='govuk-table__cell'>
            {/* TODO - Add correct link when implemented */}
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
