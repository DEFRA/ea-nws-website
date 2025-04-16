import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import Checkbox from '../../../../common/components/gov-uk/CheckBox'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'
import { setContactPreferences } from '../../../../common/redux/userSlice'

export default function WarningContactsPreferencePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [selectedContactPreferences, setSelectedContactPreferences] = useState(
    []
  )
  const contactOptions = [
    { label: 'Text', value: 'Text' },
    { label: 'Phone call', value: 'PhoneCall' }
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setContactPreferences(selectedContactPreferences))
    if (selectedContactPreferences.includes('Text')) {
      navigate('/signup/contactpreferences/mobile/add')
    } else if (selectedContactPreferences.includes('PhoneCall')) {
      navigate('/signup/contactpreferences/landline/add')
    } else {
      navigate('/signup/accountname/add')
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
          {location?.state && (
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success'
              title='Success'
              heading='Email address confirmed'
              text={
                location.state.loginEmail +
                ' is your sign in email and you’ll also get flood messages at this address'
              }
            />
          )}
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              Would you like to get flood messages in any other way? (optional)
            </h1>
            <div className='govuk-form-group'>
              <fieldset className='govuk-fieldset'>
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
