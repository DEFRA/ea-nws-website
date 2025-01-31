import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'
import { orgAccountUrls } from '../../../routes/account/AccountRoutes'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function ManageAdminDetailsPage () {
  const profile = useSelector((state) => state.session.profile)
  const location = useLocation()

  const successText = (
    <>
      {location.state?.successMessages?.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </>
  )

  return (
    <>

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row '>
          {location?.state && (
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-5 govuk-!-margin-top-4'
              title='Success'
              text={successText}
            />
          )}

          <h1 className='govuk-heading-l'>Manage administrator details</h1>
          <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
            Contact details
          </h2>
          <Link
            className='govuk-link govuk-!-display-inline-block'
            style={{ float: 'right' }}
            to={orgAccountUrls.admin.changeDetails}
          >
            Change
          </Link>
          <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3 section-break-bold' />

          <table className='govuk-table'>
            <tbody className='govuk-table__body'>
              <tr className='govuk-table__row'>
                <td className='govuk-table__header govuk-!-width-one-quarter'>
                  Name
                </td>
                <td className='govuk-table__cell  govuk-!-width-full'>
                  {profile.firstname} {profile.lastname}
                </td>
              </tr>

              <tr className='govuk-table__row'>
                <td className='govuk-table__header govuk-!-width-one-quarter'>
                  Email address
                </td>
                <td className='govuk-table__cell  govuk-!-width-full'>
                  {profile.emails[0]}
                </td>
              </tr>
            </tbody>
          </table>
          <p />
        </div>
        <p>
          If you want to also get flood messages to a mobile or landline number,{' '}
          <Link to={orgManageContactsUrls.add.details} className='govuk-link'>
            add yourself as a contact.
          </Link>
        </p>
      </main>
    </>
  )
}
