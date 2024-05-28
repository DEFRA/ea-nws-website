import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import Input from '../../../../gov-uk-components/Input'
import InsetText from '../../../../gov-uk-components/InsetText'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'
import { backendCall } from '../../../../services/BackendService'
import { authCodeValidation } from '../../../../services/validations/AuthCodeValidation'

export default function ValidateMobilePhone () {
  const navigate = useNavigate()
  const location = useLocation()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const authToken = useSelector((state) => state.session.authToken)

  const handleSubmit = async () => {
    const validationError = authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const data = {
        authToken,
        msisdn: location.state.mobile,
        code
      }
      const { errorMessage } = await backendCall(
        data,
        'signup/contactpreferences/mobile/validate',
        navigate
      )

      if (errorMessage !== null) {
        setError(errorMessage.desc)
      } else {
        navigate('/signup/contactpreferences')
      }
    }
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <PhaseBanner />
            <Link
              to='/signup/contactpreferences/mobile'
              className='govuk-back-link'
            >
              Back
            </Link>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l govuk-!-margin-top-6'>
              Check your mobile phone
            </h1>
            <p className='govuk-body'>We've sent a text with a code to:</p>
            <InsetText text={location.state.mobile} />
            <p className='govuk-body'>
              Use the code within 4 hours or it will expire
            </p>
            <Input
              inputType='text'
              value={code}
              name='Enter code'
              onChange={(val) => setCode(val)}
              error={error}
              className='govuk-input govuk-input--width-10'
            />
            <Button
              text='Continue'
              className='govuk-button'
              onClick={handleSubmit}
            />
            &nbsp; &nbsp;
            <Link
              to='/signup/contactpreferences/mobile/skipconfirmation'
              state={{
                mobile: location.state.mobile
              }}
              className='govuk-body govuk-link'
            >
              Skip and confirm later
            </Link>
            <br />
            <p className='govuk-body'>
              <a href='#' className='govuk-link'>
                Get a new code
              </a>
            </p>
            <Link
              to='/signup/contactpreferences/mobile'
              className='govuk-body govuk-link'
            >
              Enter a different mobile number
            </Link>
            <div className=' govuk-!-margin-bottom-9' />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
