import * as React from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import Input from '../../../../gov-uk-components/Input'
import InsetText from '../../../../gov-uk-components/InsetText'
import backendCall from '../../../../services/BackendService'
import codeValidation from '../../../../services/Validations/CodeValidation'

export default function ValidateLandlinePhonePage () {
  const location = useLocation()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const validationError = codeValidation(code, 6)
    setError(validationError)
    if (validationError !== '') {
      return
    }
    const data = {
      authToken: 'authToken',
      phoneNumber: location.state.phoneNumber,
      code
    }
    await backendCall(data, 'signup/contactpreferences/landline/validate')
    navigate('/signup/contactpreferences/landline/validate', {
      state: { code }
    })
  }

  return (
    <>
      <Header />
      <div class='govuk-width-container'>
        <Link
          to='/signup/contactpreferences/landline'
          className='govuk-back-link'
        >
          Back
        </Link>
        <ErrorSummary errorList={error === '' ? [] : [error]} />
        <h2 class='govuk-heading-l'>Check your email</h2>
        <div class='govuk-body'>
          We're calling this number to read out a code:
          <InsetText text={location.state.phoneNumber} />
          <Input
            name='Enter code'
            inputType='text'
            error={error}
            onChange={(val) => setCode(val)}
          />
          <Button
            className='govuk-button'
            text='Continue'
            onClick={handleSubmit}
          />
          &nbsp; &nbsp;
          <Link
            className='govuk-link'
            to='/signup/contactpreferences/landline/skipconfirm'
            state={{ phoneNumber: location.state.phoneNumber }}
          >
            Skip and confirm later
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
