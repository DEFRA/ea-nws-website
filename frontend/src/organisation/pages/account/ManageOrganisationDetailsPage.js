import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import OrganisationAccountNavigation from '../../../common/components/custom/OrganisationAccountNavigation'
import { setSigninType } from '../../../common/redux/userSlice'

export default function ManageOrganisationDetailsPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSigninType('org'))
  })

  return (
    <>
      <OrganisationAccountNavigation />
      <main className='govuk-main-wrapper'>
        <div class='govuk-grid-row'>
          <div class='govuk-grid-column-full govuk-body'>
            <h1 class='govuk-heading-l'>Manage your organisation's details</h1>

            <p className='govuk-!-margin-top-3'>
              To change these details, email us at{' '}
              <span className='govuk-link'>sampleeemail@domain.com</span>
            </p>

            <table className='govuk-table'>
              <tbody className='govuk-table__body'>
                <tr className='govuk-table__row'>
                  <td class='govuk-table__header  govuk-!-width-one-half'>
                    Name
                  </td>
                  <td className='govuk-table__cell  govuk-!-width-full'>
                    Flood Inc.
                  </td>
                </tr>
                <tr className='govuk-table__row'>
                  <td class='govuk-table__header  govuk-!-width-one-half'>
                    UK head office address
                  </td>
                  <td className='govuk-table__cell  govuk-!-width-full'>
                    1 All Saints house, The Causeway
                  </td>
                </tr>
                <tr className='govuk-table__row'>
                  <td class='govuk-table__header  govuk-!-width-one-half'>
                    Has Companies House number?
                  </td>
                  <td className='govuk-table__cell  govuk-!-width-full'>Yes</td>
                </tr>
                <tr className='govuk-table__row'>
                  <td class='govuk-table__header  govuk-!-width-one-half'>
                    Companies House number
                  </td>
                  <td className='govuk-table__cell  govuk-!-width-full'>
                    07889 456732
                  </td>
                </tr>
                <tr className='govuk-table__row'>
                  <td class='govuk-table__header  govuk-!-width-one-half'>
                    Involved in responding to public emergencies or incidents?
                  </td>
                  <td className='govuk-table__cell  govuk-!-width-full'>Yes</td>
                </tr>
              </tbody>
            </table>

            <h3 className='govuk-heading-m govuk-!-margin-top-9'>
              Alternative Contact
            </h3>
            <table className='govuk-table'>
              <tr className='govuk-table__row'>
                <td class='govuk-table__header  govuk-!-width-one-half'>
                  Name
                </td>
                <td className='govuk-table__cell  govuk-!-width-full'>
                  Joan Smith
                </td>
              </tr>
              <tr className='govuk-table__row'>
                <td class='govuk-table__header  govuk-!-width-one-half'>
                  Email address
                </td>
                <td className='govuk-table__cell  govuk-!-width-full'>
                  j.smith@floodinc.com
                </td>
              </tr>
              <tr className='govuk-table__row'>
                <td class='govuk-table__header  govuk-!-width-one-half'>
                  Telephone number
                </td>
                <td className='govuk-table__cell  govuk-!-width-full'>
                  0207 1739372
                </td>
              </tr>
              <tr className='govuk-table__row'>
                <td class='govuk-table__header  govuk-!-width-one-half'>
                  Job title (optional)
                </td>
                <td className='govuk-table__cell  govuk-!-width-full'>
                  IT Director
                </td>
              </tr>
              <br />
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
