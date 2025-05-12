import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Button from '../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import { getAdditionals } from '../../../common/services/ProfileServices'

export default function AccountPage() {
  const location = useLocation()

  const navigate = useNavigate()
  const handleButton = (event) => {
    event.preventDefault()
    navigate('/account/delete')
  }

  const profile = useSelector((state) => state.session.profile)
  const name = (profile?.firstname || '') + ' ' + (profile?.lastname || '')
  const email = profile.emails[0] || ''
  const businessName = getAdditionals(profile, 'businessName')
  const jobTitle = getAdditionals(profile, 'jobTitle')

  const bannerText = location.state?.changeBusinessDetails
    ? [
        'Business name: ' +
          (location.state?.businessName ? location.state?.businessName : ''),
        'Job title: ' +
          (location.state?.jobTitle ? location.state?.jobTitle : '')
      ]
    : location.state?.changeEmail
    ? location.state?.email + ' is your new email address to sign in with'
    : location.state?.changeName && location.state?.name

  const bannerHeading = location.state?.changeBusinessDetails
    ? 'Business details updated'
    : location.state?.changeEmail
    ? 'Email address updated'
    : location.state?.changeName && 'Name updated'

  return (
    <>
      {location.state !== null ? (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-0 govuk-!-margin-top-4'
          title='Success'
          heading={bannerHeading}
          text={bannerText}
        />
      ) : null}
      <main className='govuk-main-wrapper'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>Manage your account</h1>
            <div className='govuk-body'>
              <h2 className='govuk-heading-m'>Your account details</h2>
              <table className='govuk-table'>
                <tbody className='govuk-table__body'>
                  <tr className='govuk-table__row'>
                    <th scope='row' className='govuk-table__header row__header'>
                      Name
                    </th>
                    <td className='govuk-table__cell'>{name}</td>
                    <td className='govuk-table__cell govuk-!-text-align-right'>
                      <Link
                        to='/account/change-name'
                        aria-label='Change name on acccount'
                        className='govuk-link'
                        style={{ cursor: 'pointer' }}
                      >
                        Change
                      </Link>
                    </td>
                  </tr>
                  <tr className='govuk-table__row'>
                    <th scope='row' className='govuk-table__header row__header'>
                      Sign in email
                    </th>
                    <td className='govuk-table__cell'>{email}</td>
                    <td className='govuk-table__cell govuk-!-text-align-right'>
                      <Link
                        to='/account/change-email'
                        aria-label='Change sign in email'
                        className='govuk-link'
                        style={{ cursor: 'pointer' }}
                      >
                        Change
                      </Link>
                    </td>
                  </tr>
                  <tr className='govuk-table__row'>
                    <th scope='row' className='govuk-table__header row__header'>
                      Business name (optional)
                    </th>
                    <td className='govuk-table__cell'>{businessName}</td>
                    <td className='govuk-table__cell govuk-!-text-align-right'>
                      <Link
                        to='/account/change-business-details'
                        aria-label='Change or add business name (this is optional)'
                        className='govuk-link'
                        style={{ cursor: 'pointer' }}
                      >
                        {businessName === '' ? 'Add' : 'Change'}
                      </Link>
                    </td>
                  </tr>
                  <tr className='govuk-table__row'>
                    <th scope='row' className='govuk-table__header row__header'>
                      Job title (optional)
                    </th>
                    <td className='govuk-table__cell'>{jobTitle}</td>
                    <td className='govuk-table__cell govuk-!-text-align-right'>
                      <Link
                        to='/account/change-business-details'
                        aria-label='Change or add job title (this is optional)'
                        className='govuk-link'
                        style={{ cursor: 'pointer' }}
                      >
                        {jobTitle === '' ? 'Add' : 'Change'}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h2 className='govuk-heading-m govuk-!-margin-bottom-6'>
                Delete your account
              </h2>
              <p className='govuk-body govuk-!-margin-bottom-6'>
                If you no longer want to receive any flood messages, you can
                delete your account.
              </p>
              <Button
                text='Delete your account'
                className='govuk-button govuk-button--warning'
                onClick={handleButton}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
