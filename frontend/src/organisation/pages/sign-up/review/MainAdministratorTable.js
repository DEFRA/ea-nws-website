import React from 'react'

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
            {/* TODO: ability to change name (compatibility with geosafe)
            <Link to={orgSignUpUrls.change.mainAdmin} className='govuk-link'>
              Change
            </Link> */}
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
            {/* TODO: ability to change email (compatibility with geosafe)
            <Link to={orgSignUpUrls.change.mainAdmin} className='govuk-link'>
              Change
            </Link> */}
          </td>
        </tr>
        <br />
      </table>
    </>
  )
}
