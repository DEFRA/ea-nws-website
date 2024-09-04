import React from 'react'
import { Link } from 'react-router-dom'

export default function OrganisationDetailsTable({ Organisation }) {
  return (
    <>
      <h3 className='govuk-heading-m'>Organisation</h3>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <td class='govuk-table__header govuk-!-width-one-quarter'>Name</td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {Organisation.name}
            </td>

            <td className='govuk-table__cell'>
              <Link to='/' className='govuk-link'>
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td class='govuk-table__header  govuk-!-width-one-quarter'>
              UK head office address
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {Organisation.address}
            </td>

            <td className='govuk-table__cell'>
              <Link to='/' className='govuk-link'>
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td class='govuk-table__header  govuk-!-width-one-quarter'>
              Has Companies House number?
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {Organisation.compHouseNum ? 'Yes' : 'No'}
            </td>
            <td className='govuk-table__cell'>
              <Link to='/' className='govuk-link'>
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td class='govuk-table__header  govuk-!-width-one-quarter'>
              Companies House number
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {Organisation.compHouseNum ? Organisation.compHouseNum : '-'}
            </td>

            <td className='govuk-table__cell'>
              <Link to='/' className='govuk-link'>
                Change
              </Link>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td class='govuk-table__header  govuk-!-width-one-quarter'>
              Involved in responding to public emergencies or incidents?
            </td>
            <td className='govuk-table__cell  govuk-!-width-full'>
              {Organisation.emergencySector ? 'Yes' : 'No'}
            </td>

            <td className='govuk-table__cell'>
              <Link to='/' className='govuk-link'>
                Change
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
