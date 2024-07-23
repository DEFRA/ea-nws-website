import React from 'react'
import { Link } from 'react-router-dom'

export default function AccountDetailsTable ({ profile }) {
  return (
    <>
      <h3 className='govuk-heading-m'>Your Account</h3>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <td class='govuk-table__header  govuk-!-width-one-half'>
              Full name
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {profile.firstName + ' ' + profile.lastName}
            </td>

            <td className='govuk-table__cell'>
              <Link to='/account/change-name' className='govuk-link'>
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td class='govuk-table__header  govuk-!-width-one-half'>
              Email to sign in
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {profile.emails[0]}
            </td>

            <td className='govuk-table__cell'>
              <Link to='/account/change-email' className='govuk-link'>
                Change
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
