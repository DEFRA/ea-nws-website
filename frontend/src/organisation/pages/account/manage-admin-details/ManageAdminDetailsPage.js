import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'
import { orgAccountUrls } from '../../../routes/account/AccountRoutes'

export default function ManageAdminDetailsPage() {
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
      <Helmet>
        <title>Manage administrator details - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <main className='govuk-main-wrapper govuk-!-padding-top-4 govuk-body'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            {location?.state?.successMessages?.length > 0 && (
              <NotificationBanner
                className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-5 govuk-!-margin-top-4'
                title='Success'
                text={successText}
              />
            )}

            <h1 className='govuk-heading-l' id='main-content'>
              Manage administrator details
            </h1>
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
            <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-2 section-break-bold' />

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
        </div>
      </main>
    </>
  )
}
