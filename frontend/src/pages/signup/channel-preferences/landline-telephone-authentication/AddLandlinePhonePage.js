import * as React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import Input from '../../../../gov-uk-components/Input'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'
import backendCall from '../../../../services/BackendService'
import phoneValidation from '../../../../services/Validations/PhoneValidation'

export default function AddLandlinePhonePage() {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    const validationError = phoneValidation(phoneNumber, 'mobileAndLandline')
    setError(validationError)
    if (validationError !== '') {
      return
    }
    const data = { authToken: 'authToken', phoneNumber: phoneNumber }
    await backendCall(data, 'signup/contactpreferences/landline/add')
    navigate('/signup/contactpreferences/landline/validate', {
      state: { phoneNumber }
    })
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
            <ErrorSummary errorList={error === '' ? [] : [error]} />
            <h1 class="govuk-heading-l govuk-!-margin-top-6">
              Enter a telephone number to get flood messages by phone call
            </h1>
            <p class="govuk-body">
              We recommend using a landline or mobile number that can be called
              24 hours a day
            </p>
            <Input
              inputType={'text'}
              value={phoneNumber}
              name={'UK landline or mobile telephone number'}
              onChange={(val) => setPhoneNumber(val)}
              className={'govuk-input govuk-input--width-20'}
              error={error}
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
