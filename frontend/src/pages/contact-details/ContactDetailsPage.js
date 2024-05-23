import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import NotificationBanner from '../../gov-uk-components/NotificationBanner'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import ContactDetailsTable from './ContactDetailsTable'

export default function ContactDetailsPage() {
  const location = useLocation()

  // [TODO] we need to perform a check if this is null
  // most likely would be null if the user has logged out etc
  // but we should take the user to an error page or something similar
  const profile = useSelector((state) => state.session.profile)

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <PhaseBanner />
        {location.state !== null ? (
          <NotificationBanner
            className="govuk-notification-banner govuk-notification-banner--success"
            title="Success"
            heading={location.state.removedType + ' removed'}
            text={location.state.removedContact}
          />
        ) : null}
        <Link to="/home" className="govuk-lin">
          Back to Home
        </Link>
        <main className="govuk-main-wrapper">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h2 className="govuk-heading-l">
                Your email addresses and telephone numbers
              </h2>
              <p className="govuk-body">
                We'll send flood messages for all your location to all these
                emails and numbers. You can add more for friends and family, if
                you wish.
              </p>
              <InsetText text="You must confirm each address and number before we can send flood messages to them." />
              <ContactDetailsTable
                contacts={profile.emails}
                contactTitle="Emails"
                contactType="email address"
                notRemovable={
                  profile.emails.length === 1 &&
                  profile.mobilePhones.length === 0 &&
                  profile.homePhones.length === 0
                }
              />
              <ContactDetailsTable
                contacts={profile.mobilePhones}
                contactTitle="Texts"
                contactType="mobile telephone number"
                notRemovable={
                  profile.emails.length === 0 &&
                  profile.mobilePhones.length === 1 &&
                  profile.homePhones.length === 0
                }
              />
              <ContactDetailsTable
                contacts={profile.homePhones}
                contactTitle="Phone call warnings"
                contactType="telephone number"
                notRemovable={
                  profile.emails.length === 0 &&
                  profile.mobilePhones.length === 0 &&
                  profile.homePhones.length === 1
                }
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
