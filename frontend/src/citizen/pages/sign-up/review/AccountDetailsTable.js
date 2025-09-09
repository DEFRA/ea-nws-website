import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function AccountDetailsTable({ profile }) {
  const nameContext = ` ${
    profile.firstname + ' ' + profile.lastname
  } as your full name`

  const emailContext = ` ${profile.emails[0]} which is your current sign-in email`
  return (
    <>
      <Helmet>
        <title>Your account - Get flood warnings - GOV.UK</title>
      </Helmet>
      <div className='govuk-padding-bottom-4'>
        <h2 className='govuk-heading-m'>Your account</h2>
        <table className='govuk-table check-your-answers-table'>
          <tbody className='govuk-table__body'>
            <tr className='govuk-table__row'>
              <th
                className='govuk-table__cell govuk-!-width-one-third'
                scope='row'
              >
                Full name
              </th>
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
                  <span className='govuk-visually-hidden'>{nameContext}</span>
                </Link>
              </td>
            </tr>
            <tr className='govuk-table__row'>
              <th
                className='govuk-table__header govuk-!-width-one-third'
                scope='row'
              >
                Email to sign in
              </th>
              <td className='govuk-table__cell  govuk-!-width-full'>
                {profile.emails[0]}
              </td>

              <td className='govuk-table__cell'>
                <Link
                  role='button'
                  to='/signup/review/change-account-email'
                  className='govuk-link'
                  style={{ cursor: 'pointer' }}
                >
                  Change
                  <span className='govuk-visually-hidden'>{emailContext}</span>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
