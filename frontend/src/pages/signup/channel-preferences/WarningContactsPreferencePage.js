import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import Checkbox from '../../../gov-uk-components/CheckBox'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import NotificationBanner from '../../../gov-uk-components/NotificationBanner'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import { setContactPreferences } from '../../../redux/userSlice'

export default function WarningContactsPreferencePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [selectedContactPreferences, setSelectedContactPreferences] = useState(
    []
  )
  const [error, setError] = useState('')

  const contactOptions = [
    { label: 'Text', value: 'Text' },
    { label: 'Email', value: 'Email' },
    { label: 'Phone call', value: 'PhoneCall' }
  ]

  const handleSubmit = () => {
    if (selectedContactPreferences.length === 0) {
      setError('Select at least one way to get messages about flooding')
    } else {
      dispatch(setContactPreferences(selectedContactPreferences))
      if (selectedContactPreferences.includes('Text')) {
        navigate('/signup/contactpreferences/mobile/add')
      } else if (selectedContactPreferences.includes('Email')) {
        // navigate to email TODO - cameron add this once merged
      } else if (selectedContactPreferences.includes('PhoneCall')) {
        navigate('/signup/contactpreferences/landline/add')
      }
    }
  }

  const handleContactPreferenceChange = (event) => {
    const { value } = event.target
    setSelectedContactPreferences((prev) => {
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
            <Link
              onClick={() =>
                navigate(-1, {
                  state: {
                    email: location.state.email
                  }
                })
              }
              className="govuk-back-link"
            >
              Back
            </Link>
            {error ? (
              <ErrorSummary errorList={[error]} />
            ) : (
              <NotificationBanner
                className="govuk-notification-banner govuk-notification-banner--success"
                title="success"
                heading="Email address confirmed"
                text={location.state.email + ' is your sign in email'}
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
                  {contactOptions.map((preference) => (
                    <Checkbox
                      key={preference.value}
                      label={preference.label}
                      value={preference.value}
                      checked={selectedContactPreferences.includes(
                        preference.value
                      )}
                      onChange={handleContactPreferenceChange}
                    />
                  ))}
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
