import React from 'react'
import { Link } from 'react-router-dom'

export default function AccountDetailsTable ({ profile }) {
  return (
    <div className='govuk-padding-bottom-4'>
      <h2 className='govuk-heading-m'>Your account</h2>
      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <td className='govuk-table__header  govuk-!-width-one-half'>
              Full name
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {profile.firstname + ' ' + profile.lastname}
            </td>

            <td className='govuk-table__cell'>
              <Link
                to='/signup/review/change-account-name'
                className='govuk-link'
                style={{ cursor: 'pointer' }}
              >
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td className='govuk-table__header  govuk-!-width-one-half'>
              Email to sign in
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {profile.emails[0]}
            </td>

            <td className='govuk-table__cell'>
              <Link
                to='/signup/review/change-account-email'
                className='govuk-link'
                style={{ cursor: 'pointer' }}
              >
                Change
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
