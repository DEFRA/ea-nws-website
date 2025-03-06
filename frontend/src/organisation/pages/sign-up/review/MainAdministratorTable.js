import React from 'react'
import { Link } from 'react-router-dom'
import { orgSignUpUrls } from '../../../routes/sign-up/SignUpRoutes'

export default function ContactReviewTable ({ profile }) {
  const fullName = `${profile.firstname} ${profile.lastname}`
  return (
    <>
      <h3 className='govuk-heading-m govuk-!-margin-top-9'>
        Main administrator
      </h3>
      <table className='govuk-table'>
        <tr className='govuk-table__row'>
          <td className='govuk-table__header  govuk-!-width-one-quarter'>
            Name
          </td>
          <td className='govuk-table__cell  govuk-!-width-full'>{fullName}</td>
          <td className='govuk-table__cell'>
            <Link to={orgSignUpUrls.admin.details} className='govuk-link'>
              Change
            </Link>
          </td>
        </tr>
        <tr className='govuk-table__row'>
          <td className='govuk-table__header  govuk-!-width-one-quarter'>
            Email address
          </td>
          <td className='govuk-table__cell  govuk-!-width-full'>
            {profile.emails[0]}
          </td>
          <td className='govuk-table__cell'>
            <Link to={orgSignUpUrls.admin.details} className='govuk-link'>
              Change
            </Link>
          </td>
        </tr>
        <br />
      </table>
    </>
  )
}
