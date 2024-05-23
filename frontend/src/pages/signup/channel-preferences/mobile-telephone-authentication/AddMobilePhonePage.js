import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import Input from '../../../../gov-uk-components/Input'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'

export default function AddMobilePhonePage() {
  const navigate = useNavigate()
  const [mobile, setMobile] = ['']

  function handleSubmit() {
    navigate('/signup/contactpreferences')
  }

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-two-thirds">
            <PhaseBanner />
            <Link to="/signup/contactpreferences" className="govuk-back-link">
              Back
            </Link>
            <h1 class="govuk-heading-l govuk-!-margin-top-6">
              Enter a mobile number to get flood messages by text
            </h1>
            <p class="govuk-body">
              We recommend using a mobile number where we can reach you 24 hours
              a day
            </p>
            <Input
              inputType={'text'}
              value={mobile}
              name={'UK mobile telephone number'}
              onChange={setMobile}
              className={'govuk-input govuk-input--width-20'}
            />
            <Button
              text={'Continue'}
              className={'govuk-button'}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
