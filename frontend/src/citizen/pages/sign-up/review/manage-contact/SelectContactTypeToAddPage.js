import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../common/components/gov-uk/Radio'
export default function SelectContactTypeToAddPage () {
  const navigate = useNavigate()
  const [selectedContactType, setSelectedContactType] = useState('')
  const [error, setError] = useState('')
  const contactOptions = [
    { label: 'Email Address', value: 'Email Address' },
    { label: 'Mobile Number (texts)', value: 'Mobile Number (texts)' },
    {
      label: 'Telephone Number (phone calls)',
      value: 'Telephone Number (phone calls)'
    }
  ]

  const handleSubmit = () => {
    switch (selectedContactType) {
      case 'Mobile Number (texts)':
        navigate('/signup/review/add-mobile')
        break
      case 'Email Address':
        navigate('/signup/review/add-email')
        break
      case 'Telephone Number (phone calls)':
        navigate('/signup/review/add-landline')
        break
      default:
        setError('Select type of contact you want to add')
        break
    }
  }

  const setContactType = (event) => {
    setSelectedContactType(event.target.value)
  }

  return (
    <>
      <BackLink to='/signup/review' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>
              Select type of contact you want to add
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
                  Select type of contact you want to add
                </legend>
                {error && <p className='govuk-error-message'>{error}</p>}
                <div className='govuk-radios' data-module='govuk-radios'>
                  {contactOptions.map((contact) => (
                    <Radio
                      key={contact.value}
                      id={contact.value}
                      name='contactTypeRadios'
                      label={contact.label}
                      type='radio'
                      value={contact.value}
                      onChange={setContactType}
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
