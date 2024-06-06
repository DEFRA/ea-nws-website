import * as React from 'react'
import { useState } from 'react'
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

export default function AddLandlinePhonePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [msisdn, setMsisdn] = useState('')
  const [error, setError] = useState('')
  const session = useSelector((state) => state.session)

  const handleSubmit = async () => {
    const validationError = phoneValidation(msisdn, 'mobileAndLandline')
    setError(validationError)
    if (validationError === '') {
      const data = { authToken: session.authToken, msisdn }
      const { errorMessage } = await backendCall(
        data,
        'signup/contactpreferences/landline/add'
      )

      if (errorMessage !== null) {
        setError(errorMessage.desc)
      } else {
        const normalisedPhoneNumber = normalisePhoneNumber(msisdn)
        console.log(normalisedPhoneNumber)
        // add landline to unverified list
        dispatch(
          setProfile(
            addUnverifiedContact(
              session.profile,
              'homePhones',
              normalisedPhoneNumber
            )
          )
        )
        navigate('/signup/contactpreferences/landline/validate', {
          state: { msisdn: normalisedPhoneNumber }
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
            <Link to={''} className="govuk-back-link">
              Back
            </Link>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className="govuk-heading-l govuk-!-margin-top-6">
              Enter a telephone number to get flood messages by phone call
            </h1>
            <p className="govuk-body">
              We recommend using a landline or mobile number that can be called
              24 hours a day
            </p>
            <Input
              inputType="text"
              value={msisdn}
              name="UK landline or mobile telephone number"
              onChange={(val) => setMsisdn(val)}
              className="govuk-input govuk-input--width-20"
              error={error}
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
