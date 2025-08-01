import React from 'react'
import { Link } from 'react-router-dom'
import { orgSignUpUrls } from '../../../routes/sign-up/SignUpRoutes'

export default function OrganisationDetailsTable ({ organisation }) {
  return (
    <>
      <h3 className='govuk-heading-m'>Organisation</h3>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <td className='govuk-table__header govuk-!-width-one-quarter'>
              Name
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {organisation.name}
            </td>

            <td className='govuk-table__cell'>
              {/* TODO: ability to change org name (compatibility with geosafe)
              <Link to={orgSignUpUrls.change.name} className='govuk-link'>
                Change
              </Link> */}
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td className='govuk-table__header  govuk-!-width-one-quarter'>
              UK head office address
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {organisation.address ? `${organisation.address}` : '-'}
            </td>

            <td className='govuk-table__cell'>
              <Link to={orgSignUpUrls.change.address} className='govuk-link'>
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td className='govuk-table__header  govuk-!-width-one-quarter'>
              Has Companies House number?
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {organisation.compHouseNum ? 'Yes' : 'No'}
            </td>
            <td className='govuk-table__cell'>
              <Link
                to={orgSignUpUrls.change.compHouseNum}
                className='govuk-link'
              >
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td className='govuk-table__header  govuk-!-width-one-quarter'>
              Companies House number
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {organisation.compHouseNum ? organisation.compHouseNum : '-'}
            </td>

            <td className='govuk-table__cell'>
              <Link
                to={orgSignUpUrls.change.compHouseNum}
                className='govuk-link'
              >
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td className='govuk-table__header  govuk-!-width-one-quarter'>
              Involved in responding to public emergencies or incidents?
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {organisation.emergencySector ? 'Yes' : 'No'}
            </td>

            <td className='govuk-table__cell'>
              <Link to={orgSignUpUrls.change.sector} className='govuk-link'>
                Change
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
