import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import Checkbox from '../../../../common/components/gov-uk/CheckBox'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'
import { setContactPreferences } from '../../../../common/redux/userSlice'
import CitizenAccountNavigation from '../../../../common/components/custom/CitizenAccountNavigation'
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

  const handleSubmit = () => {
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
            <h1 className='govuk-heading-l'>
              How would you like to get messages about flooding?
            </h1>
            <div
              className={
                error
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <fieldset className='govuk-fieldset'>
                <legend className='govuk-fieldset__legend'>
                  Select at least one option
                </legend>
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
              </fieldset>
            </div>
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
