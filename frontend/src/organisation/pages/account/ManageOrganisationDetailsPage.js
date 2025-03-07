import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSigninType } from '../../../common/redux/userSlice'

export default function ManageOrganisationDetailsPage () {
  const dispatch = useDispatch()
  const orgDetails =
    useSelector((state) => state?.session?.organization) || null
  const formattedOrg = JSON.parse(orgDetails?.description)

  useEffect(() => {
    dispatch(setSigninType('org'))
  }, [])

  const email = 'getfloodwarnings@environment-agency.gov.uk'

  return (
    <>
      <main className='govuk-main-wrapper'>
        <div Name='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-body'>
            <h1 className='govuk-heading-l'>
              Manage your organisation's details
            </h1>

            <p className='govuk-!-margin-top-3'>
              To change these details, email us at{' '}
              <Link className='govuk-link'>{email}.</Link>
            </p>

            <table className='govuk-table'>
              <tbody className='govuk-table__body'>
                <tr className='govuk-table__row'>
                  <td className='govuk-table__header  govuk-!-width-one-quarter'>
                    Name
                  </td>
                  <td className='govuk-table__cell  govuk-!-width-three-quarter'>
                    {orgDetails?.name}
                  </td>
                </tr>
                <tr className='govuk-table__row'>
                  <td className='govuk-table__header  govuk-!-width-one-quarter'>
                    UK head office address
                  </td>
                  <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                    {formattedOrg?.address}
                  </td>
                </tr>
                <tr className='govuk-table__row'>
                  <td className='govuk-table__header  govuk-!-width-one-quarter'>
                    Has Companies House number?
                  </td>
                  <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                    {formattedOrg?.compHouseNum ? 'Yes' : 'No'}
                  </td>
                </tr>
                <tr className='govuk-table__row'>
                  <td className='govuk-table__header  govuk-!-width-one-quarter'>
                    Companies House number
                  </td>
                  <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                    {formattedOrg?.compHouseNum}
                  </td>
                </tr>
                <tr className='govuk-table__row'>
                  <td className='govuk-table__header  govuk-!-width-one-quarter'>
                    Involved in responding to public emergencies or incidents?
                  </td>
                  <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                    {formattedOrg?.emergencySector ? 'Yes' : 'No'}
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
                  {formattedOrg?.alternativeContact?.firstName +
                    ' ' +
                    formattedOrg?.alternativeContact?.lastName}
                </td>
              </tr>
              <tr className='govuk-table__row'>
                <td className='govuk-table__header  govuk-!-width-one-quarter'>
                  Email address
                </td>
                <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                  {formattedOrg?.alternativeContact?.email}
                </td>
              </tr>
              <tr className='govuk-table__row'>
                <td className='govuk-table__header  govuk-!-width-one-quarter'>
                  Telephone number
                </td>
                <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                  {formattedOrg?.alternativeContact?.telephone}
                </td>
              </tr>
              <tr className='govuk-table__row'>
                <td className='govuk-table__header  govuk-!-width-one-quarter'>
                  Job title (optional)
                </td>
                <td className='govuk-table__cell   govuk-!-width-three-quarter'>
                  {formattedOrg?.alternativeContact?.jobTitle}
                </td>
              </tr>
              <br />
            </table>
            <h2 className='govuk-heading-m govuk-!-margin-top-9'>
              Delete account
            </h2>
            <p>
              You'll need to email us at{' '}
              <Link className='govuk-link'>{email}</Link> to delete your
              account.
            </p>
            <p>
              Tell us the reason why you’d like to delete your account in your
              email.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
