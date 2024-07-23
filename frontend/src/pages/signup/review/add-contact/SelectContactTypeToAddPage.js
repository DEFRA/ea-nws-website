import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'
import Radio from '../../../../gov-uk-components/Radio'
import { addContactPreference } from '../../../../redux/userSlice'
export default function SelectContactTypeToAddPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedContactType, setSelectedContactType] = useState('')
  const [error, setError] = useState('')
  const contactPreferences = useSelector((state) => state.session.contactPreferences)
  const contactOptions = [
    { label: 'Email Address', value: 'Email Address' },
    { label: 'Mobile Number (texts)', value: 'Mobile Number (texts)' },
    { label: 'Telephone Number (phone calls)', value: 'Telephone Number (phone calls)' }
  ]

  const handleSubmit = () => {
    switch (selectedContactType) {
      case 'Mobile Number (texts)':
        if (!contactPreferences.includes('Text')) {
          dispatch(addContactPreference('Text'))
        }
        navigate('/signup/review/add-mobile')
        break
      case 'Email Address':
        if (!contactPreferences.includes('Email Address')) {
          dispatch(addContactPreference('Email Address'))
        }
        navigate('/signup/review/add-email')
        break
      case 'Telephone Number (phone calls)':
        if (!contactPreferences.includes('PhoneCall')) {
          dispatch(addContactPreference('PhoneCall'))
        }
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
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <Link to='/signup/review' className='govuk-back-link'>
              Back
            </Link>
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
      </div>
      <Footer />
    </>
  )
}
