import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../common/components/gov-uk/Radio'

export default function SelectContactTypeToAddPage() {
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
  const contactTypeGroupId = 'contact-type-group'

  const handleSubmit = (event) => {
    event.preventDefault()
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
      <Helmet>
        <title>
          Select type of contact you want to add - Get flood warnings - GOV.UK
        </title>
      </Helmet>
      <BackLink to='/signup/review' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && (
              <ErrorSummary
                errorList={[{ text: error, componentId: contactTypeGroupId }]}
              />
            )}
            <h1 className='govuk-heading-l' id='main-content'>
              Select type of contact you want to add
            </h1>
            <div
              className={
                error
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <fieldset
                id={contactTypeGroupId}
                className='govuk-fieldset'
                aria-describedby={
                  error
                    ? 'contact-type-hint contact-type-error'
                    : 'contact-type-hint'
                }
              >
                <legend className='govuk-fieldset__legend'>
                  Select type of contact you want to add
                </legend>
                {error && (
                  <p className='govuk-error-message'>
                    <span className='govuk-visually-hidden'>Error:</span>{' '}
                    {error}
                  </p>
                )}
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
