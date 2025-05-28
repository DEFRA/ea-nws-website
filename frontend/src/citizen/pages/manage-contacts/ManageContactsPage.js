import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Details from '../../../common/components/gov-uk/Details'
import InsetText from '../../../common/components/gov-uk/InsetText'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import ContactDetailsTable from './ContactDetailsTable'

export default function ManageContactsPage () {
  const location = useLocation()
  const profile = useSelector((state) => state.session.profile)
  // user is not allowed to remove the primary email
  const primaryEmail = profile.emails[0]

  const unconfirmedMessage = (unconfirmedtype) => {
    if (unconfirmedtype === 'email') {
      return (
        <>
          You need to{' '}
          <Link
            to='/managecontacts/validate-email'
            className='govuk-link'
            style={{ cursor: 'pointer' }}
          >
            confirm the email address
          </Link>{' '}
          first
        </>
      )
    } else if (unconfirmedtype === 'mobilePhone') {
      return (
        <>
          You need to{' '}
          <Link
            to='/managecontacts/validate-mobile'
            className='govuk-link'
            style={{ cursor: 'pointer' }}
          >
            confirm the number
          </Link>{' '}
          first
        </>
      )
    }
    return (
      <>
        You need to{' '}
        <Link
          to='/managecontacts/validate-landline'
          className='govuk-link'
          style={{ cursor: 'pointer' }}
        >
          confirm the number
        </Link>{' '}
        first
      </>
    )
  }

  const confirmedHeading = (confirmedtype) => {
    switch (confirmedtype) {
      case 'email':
        return 'Email address confirmed'
      case 'mobilePhone':
        return 'Mobile number confirmed'
      case 'homePhone':
        return 'Telephone number confirmed'
      default:
    }
  }

  const detailsMessage = (
    <div>
      You must keep at least one contact on your account.&nbsp;
      <a href='/managecontacts/add-email' className='govuk-link'>
        Add a new contact
      </a>
      &nbsp; before removing any you do not need. Or you could&nbsp;
      <a href='/account/delete' className='govuk-link'>
        Delete your account
      </a>
      &nbsp; instead.
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Your Email Addresses and Telephone Numbers - GOV.UK</title>
      </Helmet>
      {location.state !== null && location.state.removedContact
        ? (
          <NotificationBanner
            className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-0 govuk-!-margin-top-4'
            title='Success'
            heading={location.state.removedType + ' removed'}
            text={location.state.removedContact}
          />
          )
        : null}
      {location.state !== null && location.state.unconfirmedtype
        ? (
          <NotificationBanner
            className='govuk-notification-banner govuk-!-margin-bottom-0 govuk-!-margin-top-4'
            title='Important'
            heading={
            'We cannot send flood messages to ' +
            location.state.unconfirmedvalue +
            ' yet'
          }
            text={unconfirmedMessage(location.state.unconfirmedtype)}
          />
          )
        : null}
      {location.state !== null && location.state.confirmedtype
        ? (
          <NotificationBanner
            className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-0 govuk-!-margin-top-4'
            title='Success'
            heading={confirmedHeading(location.state.confirmedtype)}
            text={location.state.confirmedvalue + ' will receive flood messages'}
          />
          )
        : null}
      <main className='govuk-main-wrapper'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h2 className='govuk-heading-l'>
              Your email addresses and telephone numbers
            </h2>
            <p className='govuk-body'>
              We'll send flood messages for all your locations to all these
              emails and numbers. You can add more for friends and family, if
              you wish.
            </p>
            <InsetText text='You must confirm each address and number before we can send flood messages to them.' />
            <ContactDetailsTable
              contacts={profile.emails}
              unregisteredContact={profile.unverified?.emails || []}
              contactTitle='Emails'
              contactType='email address'
              primaryContact={primaryEmail}
            />
            {profile.emails.length === 1 &&
              profile.mobilePhones.length === 0 &&
              profile.homePhones.length === 0 && (
                <Details
                  title='If you want to remove this contact'
                  text={detailsMessage}
                />
            )}
            <ContactDetailsTable
              contacts={profile.mobilePhones}
              unregisteredContact={profile.unverified?.mobilePhones || []}
              contactTitle='Texts'
              contactType='mobile telephone number'
              primaryContact={null}
            />
            <ContactDetailsTable
              contacts={profile.homePhones}
              unregisteredContact={profile.unverified?.homePhones || []}
              contactTitle='Phone call warnings'
              contactType='telephone number'
              primaryContact={null}
            />
          </div>
        </div>
      </main>
    </>
  )
}
