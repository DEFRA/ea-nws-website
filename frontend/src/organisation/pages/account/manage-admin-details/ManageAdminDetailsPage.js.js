import React from 'react'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { accountUrls } from '../../../routes/account/AccountRoutes'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'
export default function ManageAdmindetailsPage () {
  // WIP page
  const profile = useSelector((state) => state.session.profile)
  const navigate = useNavigate()
  const location = useLocation()
  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const successText = (
    <>
      {location.state?.successMessages?.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </>
  )

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row '>
          {location?.state &&
          (
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-5 govuk-!-margin-top-4'
              title='Success'
              text={successText}
            />)}

          <h1 className='govuk-heading-l'>Manage administrator details</h1>
          <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
            Contact details
          </h2>
          <Link
            className='govuk-link govuk-!-display-inline-block'
            style={{ float: 'right' }}
            to={accountUrls.admin.changeDetails}
          >
            Change
          </Link>
          <hr
            className='govuk-!-margin-top-1 govuk-!-margin-bottom-3 section-break-bold'
          />

          <table className='govuk-table'>
            <tbody className='govuk-table__body'>
              <tr className='govuk-table__row'>
                <td class='govuk-table__header govuk-!-width-one-quarter'>Name</td>
                <td className='govuk-table__cell  govuk-!-width-full'>
                  {profile.firstname}{' '}{profile.lastname}
                </td>
              </tr>

              <tr className='govuk-table__row'>
                <td class='govuk-table__header govuk-!-width-one-quarter'>Email address</td>
                <td className='govuk-table__cell  govuk-!-width-full'>
                  {profile.emails[0]}
                </td>
              </tr>
            </tbody>
          </table>
          <p />
        </div>
        <p>
          If you want to also get flood messages to a mobile or landline number,
          <a
            href={orgManageContactsUrls.add.addNew}
            classNAme='govuk-link'
          >
            {' '}
            add yourself as a contact.
          </a>
        </p>

      </main>
    </>
  )
}
