import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import NotificationBanner from '../../../gov-uk-components/NotificationBanner'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'

export default function WarningContactsPreferencePage() {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <Link to="/signup/validate" className="govuk-back-link">
                Back
              </Link>
              <PhaseBanner />
              <NotificationBanner
                className="govuk-notification-banner govuk-notification-banner--success"
                title="success"
                heading="Email address confirmed"
                text="some email is confirmed"
              />
              <h1 className="govuk-heading-l">
                How would you like to get messages about flooding?
              </h1>

              <Button
                text="Continue"
                className="govuk-button"
                // this will need updated to reflect what the user has selected
                // i.e if use hasnt selected text, then they get taken to the email
                // authentication flow instead - using ternery operator and state
                // should work fine
                onClick={navigate('/')}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
