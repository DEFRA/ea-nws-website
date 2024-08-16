import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function ContactReviewTable({ organisation }) {
  const navigate = useNavigate()

  return (
    <>
      <h3 className='govuk-heading-m'>Alternative Contact</h3>
      <table className='govuk-table'>
        <tr className='govuk-table__row'>
          <td class='govuk-table__header  govuk-!-width-one-half'>Name</td>
          <td className='govuk-table__cell  govuk-!-width-full'>
            {organisation.alternativecontact.name}
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
            {organisation.alternativecontact.emailaddress}
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
            {organisation.alternativecontact.phoneNumber}
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
          <td className='govuk-table__cell  govuk-!-width-full'>
            {organisation.alternativecontact.jobTitle}
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
