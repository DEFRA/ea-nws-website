import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import CheckboxRadios from '../../../../gov-uk-components/CheckBoxRadios'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'
import { addContactPreference } from '../../../../redux/userSlice'
export default function SelectContactTypeToAddPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedContactType, setSelectedContactType] = useState('')
  const [error, setError] = useState('')
  const contactPreferences = useSelector((state) => state.session.contactPreferences)
  const contactOptions = [
    { label: 'Text', value: 'Text' },
    { label: 'Email', value: 'Email' },
    { label: 'Phone call', value: 'PhoneCall' }
  ]

  const handleSubmit = () => {
    if (selectedContactType === '') {
      setError('Select at least one way to get messages about flooding')
    } else {      
      if (selectedContactType === 'Text') {
        if(!contactPreferences.includes('Text')){
            dispatch(addContactPreference(selectedContactType))
        }
        navigate('/signup/review/add-mobile')
      } else if (selectedContactType === 'Email') {
        if(!contactPreferences.includes('Email')){
            dispatch(addContactPreference(selectedContactType))
        }
        navigate('/signup/review/add-email')
      } else if (selectedContactType === 'PhoneCall') {
        if(!contactPreferences.includes('PhoneCall')){
            dispatch(addContactPreference(selectedContactType))
        }
        navigate('/signup/review/add-landline')
      }
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
                  <CheckboxRadios
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
