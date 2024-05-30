import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import NotificationBanner from '../../../gov-uk-components/NotificationBanner'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'

export default function WarningContactsPreferencePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [contactPreferences, setContactPreferences] = useState([])
  const [error, setError] = useState('')

  const handleSubmit = () => {
    console.log('hello')
    if (contactPreferences.length === 0) {
      setError('Select at least one way to get messages about flooding')
    }
    // TODO @camillie and cammy - need to decide how we store the users contact preference so we can guide the user through the correct flow

    // this will need updated to reflect what the user has selected
    // i.e if use hasnt selected text, then they get taken to the email
    // authentication flow instead - using ternery operator and state
    // should work fine

    // add a navigate here to the correct page
  }

  const handleContactPreferenceChange = (event) => {
    const { value } = event.target
    setContactPreferences((prev) => {
      if (prev.includes(value)) {
        return prev.filter((preference) => preference !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <PhaseBanner />
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <Link to="/signup/validate" className="govuk-back-link">
              Back
            </Link>
            {error ? (
              <ErrorSummary errorList={[error]} />
            ) : (
              <NotificationBanner
                className="govuk-notification-banner govuk-notification-banner--success"
                title="success"
                heading="Email address confirmed"
                // get email from  location - pass from megans signup page
                text="some email is confirmed"
              />
            )}
            <h1 className="govuk-heading-l">
              How would you like to get messages about flooding?
            </h1>
            <div
              className={
                error
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <fieldset className="govuk-fieldset">
                <legend className="govuk-fieldset__legend">
                  Select at least one option
                </legend>
                {error && <p className="govuk-error-message">{error}</p>}
                <div className="govuk-radios" data-module="govuk-radios">
                  <div className="govuk-radios__item">
                    <input
                      className="govuk-radios__input"
                      type="checkbox"
                      value="Text"
                      checked={contactPreferences.includes('Text')}
                      onChange={handleContactPreferenceChange}
                    />
                    <label className="govuk-label govuk-radios__label">
                      Text
                    </label>
                  </div>
                  <div className="govuk-radios__item">
                    <input
                      className="govuk-radios__input"
                      type="checkbox"
                      value="Email"
                      checked={contactPreferences.includes('Email')}
                      onChange={handleContactPreferenceChange}
                    />
                    <label className="govuk-label govuk-radios__label">
                      Email
                    </label>
                  </div>
                  <div className="govuk-radios__item">
                    <input
                      className="govuk-radios__input"
                      type="checkbox"
                      value="PhoneCall"
                      checked={contactPreferences.includes('PhoneCall')}
                      onChange={handleContactPreferenceChange}
                    />
                    <label className="govuk-label govuk-radios__label">
                      Phone call
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <Button
              text="Continue"
              className="govuk-button"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
