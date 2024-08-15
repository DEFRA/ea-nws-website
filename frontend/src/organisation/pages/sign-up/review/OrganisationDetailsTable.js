import React from 'react'
import { Link } from 'react-router-dom'

export default function OrganisationDetailsTable({ profile }) {
  return (
    <>
      <h3 className='govuk-heading-m'>Organisation</h3>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <td class='govuk-table__header  govuk-!-width-one-half'>Name</td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {profile.firstname + ' ' + profile.lastname}
            </td>

            <td className='govuk-table__cell'>
              <Link
                to='/signup/review/change-account-name'
                className='govuk-link'
              >
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td class='govuk-table__header  govuk-!-width-one-half'>
              UK head office address
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {profile.emails[0]}
            </td>

            <td className='govuk-table__cell'>
              <Link
                to='/signup/review/change-account-email'
                className='govuk-link'
              >
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td class='govuk-table__header  govuk-!-width-one-half'>
              Has Companies House number?
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {profile.emails[0]}
            </td>

            <td className='govuk-table__cell'>
              <Link
                to='/signup/review/change-account-email'
                className='govuk-link'
              >
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td class='govuk-table__header  govuk-!-width-one-half'>
              Companies House number
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {profile.emails[0]}
            </td>

            <td className='govuk-table__cell'>
              <Link
                to='/signup/review/change-account-email'
                className='govuk-link'
              >
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td class='govuk-table__header  govuk-!-width-one-half'>
              Involved in responding to public emergencies or incidents?
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {profile.emails[0]}
            </td>

            <td className='govuk-table__cell'>
              <Link
                to='/signup/review/change-account-email'
                className='govuk-link'
              >
                Change
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
