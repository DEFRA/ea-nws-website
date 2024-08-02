import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import ConfirmationPanel from '../../gov-uk-components/Panel'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function AccountDeleteConfirmPage() {
  return (
    <>
      <div className="page-container">
        <Header />
        <div className="govuk-width-container body-container">
          <PhaseBanner />

          {/* Main body */}
          <main className="govuk-main-wrapper">
            {/* Account deletion confirmation panel */}
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                <ConfirmationPanel
                  title="Account deleted"
                  body="You'll no longer get flood warnings"
                />
              </div>
            </div>

            <br />

            {/* Other text */}
            <h2 className="govuk-heading-m">If you change your mind</h2>
            <p className="govuk-body govuk-!-margin-bottom-6">
              You'll need to{' '}
              <Link to="/signup" className="govuk-link">
                sign up again
              </Link>
              .
            </p>
            <p className="govuk-body govuk-!-margin-bottom-6">
              <Link to="/survey" className="govuk-link">
                What do you think of this service?
              </Link>{' '}
              Takes 30 seconds
            </p>
            <h2 className="govuk-heading-m">More about flooding</h2>
            <p className="govuk-body govuk-!-margin-bottom-6">
              Find out how to{' '}
              <Link to="https://gov.uk/flood" className="govuk-link">
                protect yourself and your property online from flooding
              </Link>
              .
            </p>
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}
