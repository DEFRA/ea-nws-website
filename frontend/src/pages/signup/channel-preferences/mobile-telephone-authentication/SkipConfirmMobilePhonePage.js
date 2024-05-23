import * as React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'

export default function SkipConfirmMobilePhonePage() {
  const location = useLocation()
  const navigate = useNavigate()

  function handleSubmit() {}

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-two-thirds">
            <PhaseBanner />
            <Link
              to="/signup/contactpreferences/mobile"
              className="govuk-back-link"
            >
              Back
            </Link>
            <h1 class="govuk-heading-l govuk-!-margin-top-6">
              We cannot send flood messages to {'some number'} until you confirm
              this number
            </h1>
            <Button
              text={"I'll confirm this later"}
              className={'govuk-button'}
              onClick={handleSubmit}
            />
            <p class="govuk-body">
              <a href="#" class="govuk-link">
                Confirm now
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
