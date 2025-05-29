import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import Checkbox from '../../../../common/components/gov-uk/CheckBox'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'
import { setContactPreferences } from '../../../../common/redux/userSlice'

export default function WarningContactsPreferencePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginEmail = useSelector((state) => state.session.profile.emails[0])
  const [selectedContactPreferences, setSelectedContactPreferences] = useState(
    []
  )
  const [error, setError] = useState('')

  const contactOptions = [
    { label: 'Text', value: 'Text' },
    { label: 'Phone call', value: 'PhoneCall' }
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    if (selectedContactPreferences.length === 0) {
      setError('Select at least one way to get messages about flooding')
    } else {
      dispatch(setContactPreferences(selectedContactPreferences))
      if (selectedContactPreferences.includes('Text')) {
        navigate('/signup/contactpreferences/mobile/add')
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
      <Helmet>
        <title>How would you like to get flood messages? - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink to='/signup/validate' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error
              ? (
                <ErrorSummary errorList={[error]} />
                )
              : (
                <NotificationBanner
                  className='govuk-notification-banner govuk-notification-banner--success'
                  title='Success'
                  heading='Email address confirmed'
                  text={loginEmail + ' is your sign in email'}
                />
                )}
            <fieldset className='govuk-fieldset' aria-describedby="group-hint">
              <legend className='govuk-fieldset__legend'>
                <h1 className='govuk-heading-l'>
                  How would you like to get messages about flooding?
                </h1>
              </legend>
              <div
                className={
                  error
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                <span id="group-hint">Select at least one option</span>

                {error && <p className='govuk-error-message'>{error}</p>}
                <div className='govuk-radios' data-module='govuk-radios'>
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
              </div>
            </fieldset>
            <Button
              text='Continue'
              className='govuk-button'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
