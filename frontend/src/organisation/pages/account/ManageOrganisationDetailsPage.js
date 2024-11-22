import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import OrganisationAccountNavigation from '../../../common/components/custom/OrganisationAccountNavigation'
import { setSigninType } from '../../../common/redux/userSlice'

export default function ManageOrganisationDetailsPage () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSigninType('org'))
  })

  const email = 'Getfloodwarnings@environment-agency.gov.uk'

  return (
    <>
      <OrganisationAccountNavigation />
      <main className='govuk-main-wrapper'>
        <div Name='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-body'>
            <h1 className='govuk-heading-l'>Manage your organisation's details</h1>

            <p className='govuk-!-margin-top-3'>
              To change these details, email us at{' '}
              <Link className='govuk-link'>{email}</Link>
            </p>

            <table className='govuk-table'>
              <tbody className='govuk-table__body'>
                <tr className='govuk-table__row'>
                  <td className='govuk-table__header  govuk-!-width-one-quarter'>
                    Name
                  </td>
                  <td className='govuk-table__cell  govuk-!-width-three-quarter'>
                    Flood Inc.
                  </td>
                </tr>
                <tr className='govuk-table__row'>
                  <td className='govuk-table__header  govuk-!-width-one-quarter'>
                    UK head office address
                  </td>
                  <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                    1 All Saints house, The Causeway
                  </td>
                </tr>
                <tr className='govuk-table__row'>
                  <td className='govuk-table__header  govuk-!-width-one-quarter'>
                    Has Companies House number?
                  </td>
                  <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                    Yes
                  </td>
                </tr>
                <tr className='govuk-table__row'>
                  <td className='govuk-table__header  govuk-!-width-one-quarter'>
                    Companies House number
                  </td>
                  <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                    07889 456732
                  </td>
                </tr>
                <tr className='govuk-table__row'>
                  <td className='govuk-table__header  govuk-!-width-one-quarter'>
                    Involved in responding to public emergencies or incidents?
                  </td>
                  <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                    Yes
                  </td>
                </tr>
              </tbody>
            </table>

            <h3 className='govuk-heading-m govuk-!-margin-top-9'>
              Alternative Contact
            </h3>
            <table className='govuk-table'>
              <tr className='govuk-table__row'>
                <td className='govuk-table__header  govuk-!-width-one-quarter'>
                  Name
                </td>
                <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                  Joan Smith
                </td>
              </tr>
              <tr className='govuk-table__row'>
                <td className='govuk-table__header  govuk-!-width-one-quarter'>
                  Email address
                </td>
                <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                  j.smith@floodinc.com
                </td>
              </tr>
              <tr className='govuk-table__row'>
                <td className='govuk-table__header  govuk-!-width-one-quarter'>
                  Telephone number
                </td>
                <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                  0207 1739372
                </td>
              </tr>
              <tr className='govuk-table__row'>
                <td className='govuk-table__header  govuk-!-width-one-quarter'>
                  Job title (optional)
                </td>
                <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                  IT Director
                </td>
              </tr>
              <br />
            </table>
            <h2 className='govuk-heading-m govuk-!-margin-top-9'>
              Delete account
            </h2>
            <p>
              You'll need to email us at{' '}
              <Link className='govuk-link'>{email}</Link>
              {' '} to delete your account.
            </p>
            <p>
              Tell us the reason why you’d like to delete your account in your email.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
