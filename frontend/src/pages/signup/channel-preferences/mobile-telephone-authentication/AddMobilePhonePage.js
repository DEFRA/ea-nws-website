import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import Input from '../../../../gov-uk-components/Input'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../../../redux/userSlice'
import { backendCall } from '../../../../services/BackendService'
import { addUnverifiedContact } from '../../../../services/ProfileServices'
import { normalisePhoneNumber } from '../../../../services/formatters/NormalisePhoneNumber'
import { phoneValidation } from '../../../../services/validations/PhoneValidation'

export default function AddMobilePhonePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const session = useSelector((state) => state.session)

  const handleSubmit = async () => {
    const validationError = phoneValidation(mobile, 'mobile')
    setError(validationError)
    if (validationError === '') {
      const data = { authToken: session.authToken, msisdn: mobile }
      const { errorMessage } = await backendCall(
        data,
        'api/signup/contactpreferences/mobile/add',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage.desc)
      } else {
        const normalisedMobile = normalisePhoneNumber(mobile)
        // add mobile to unverified list
        dispatch(
          setProfile(
            addUnverifiedContact(session.profile, 'mobile', normalisedMobile)
          )
        )
        navigate('/signup/contactpreferences/mobile/validate', {
          state: { mobile: normalisedMobile }
        })
      }
    }
  }

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <PhaseBanner />
            <Link to="/signup/contactpreferences" className="govuk-back-link">
              Back
            </Link>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className="govuk-heading-l govuk-!-margin-top-6">
              Enter a mobile number to get flood messages by text
            </h1>
            <p className="govuk-body">
              We recommend using a mobile number where we can reach you 24 hours
              a day
            </p>
            <Input
              inputType="text"
              value={mobile}
              name="UK mobile telephone number"
              onChange={(val) => setMobile(val)}
              error={error}
              className="govuk-input govuk-input--width-20"
            />
            <Button
              text="Continue"
              className="govuk-button"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
