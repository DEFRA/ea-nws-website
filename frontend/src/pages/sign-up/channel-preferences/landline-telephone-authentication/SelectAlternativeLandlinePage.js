/* eslint-disable no-use-before-define */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import Radio from '../../../../gov-uk-components/Radio'
import { setCurrentContact, setProfile } from '../../../../redux/userSlice'
import { backendCall } from '../../../../services/BackendService'
import {
  addUnverifiedContact,
  addVerifiedContact
} from '../../../../services/ProfileServices'
import { normalisePhoneNumber } from '../../../../services/formatters/NormalisePhoneNumber'
import { phoneValidation } from '../../../../services/validations/PhoneValidation'
export default function SelectAlternativeLandlinePage() {
  const navigate = useNavigate()
  const [selectedNumber, setSelectedNumber] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.session.profile)
  const authToken = useSelector((state) => state.session.authToken)

  const unverifiedMobileNumbers = profile.unverified.mobilePhones
  const verifiedMobileNumbers = profile.mobilePhones
  const mobileNumbers = [...unverifiedMobileNumbers, ...verifiedMobileNumbers]

  const handleSubmit = async (event) => {
    event.preventDefault()
    const phoneValidationErrors = phoneValidation(
      selectedNumber,
      'mobileAndLandline'
    )
    setValidationError(
      phoneValidationErrors === 'Enter a UK landline or mobile telephone number'
        ? 'Which telephone number do you want to use?'
        : phoneValidationErrors
    )
    if (validationError === '') {
      const normalisedPhoneNumber = normalisePhoneNumber(selectedNumber)
      if (verifiedMobileNumbers.includes(normalisedPhoneNumber)) {
        const updatedProfile = dispatch(
          setProfile(
            addVerifiedContact(profile, 'homePhones', normalisedPhoneNumber)
          )
        )
        updateBackEndProfile(updatedProfile)
        navigate('/signup/accountname/add')
      } else {
        const updatedProfile = dispatch(
          setProfile(
            addUnverifiedContact(profile, 'homePhones', normalisedPhoneNumber)
          )
        )
        const updateProfileError = await updateBackEndProfile(updatedProfile)
        if (updateProfileError !== null) {
          setError(updateProfileError)
          return
        }
        const dataToSend = { msisdn: normalisedPhoneNumber, authToken }
        const { errorMessage } = await backendCall(
          dataToSend,
          'api/add_contact/landline/add',
          navigate
        )
        if (errorMessage !== null) {
          setError(errorMessage)
          return
        }
        dispatch(setCurrentContact(normalisedPhoneNumber))
        navigate('/signup/contactpreferences/landline/validate')
      }
    }
  }

  const updateBackEndProfile = async (updatedProfile) => {
    const dataToSend = { profile: updatedProfile, authToken }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/profile/update',
      navigate
    )

    return errorMessage
  }

  return (
    <>
      <Header />
      <div class='govuk-width-container'>
        <Link onClick={() => navigate(-1)} className='govuk-back-link'>
          Back
        </Link>
        <main className='govuk-main-wrapper'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              {error && <ErrorSummary errorList={[error, validationError]} />}
              <h2 className='govuk-heading-l'>
                Which telephone number do you want to use to get flood messages
                by phone call?
              </h2>
              <div className='govuk-body'>
                <p>
                  We recommend using a landline or mobile number that can be
                  called 24 hours a day
                </p>

                <div
                  className={
                    validationError
                      ? 'govuk-form-group govuk-form-group--error'
                      : 'govuk-form-group'
                  }
                >
                  <fieldset className='govuk-fieldset'>
                    {validationError && (
                      <p className='govuk-error-message'>{validationError}</p>
                    )}
                    {mobileNumbers.map((mobileNumber) => (
                      <div style={{ display: 'block' }}>
                        <div
                          className='govuk-!-padding-bottom-4'
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          <Radio
                            key={mobileNumber}
                            label={mobileNumber}
                            value={mobileNumber}
                            id={mobileNumber}
                            name='phoneNumberRadio'
                            onChange={(e) => {
                              setSelectedOption(e.target.value)
                              setSelectedNumber(mobileNumber)
                            }}
                            conditional={selectedOption === 'mobileNumber'}
                          />
                          {unverifiedMobileNumbers.includes(mobileNumber) && (
                            <strong className='govuk-tag govuk-tag--red'>
                              Unconfirmed
                            </strong>
                          )}
                        </div>
                      </div>
                    ))}
                    <Radio
                      label='A different number'
                      value='otherNumber'
                      name='phoneNumberRadio'
                      onChange={(e) => {
                        setSelectedOption(e.target.value)
                        setSelectedNumber('')
                      }}
                      conditional={selectedOption === 'otherNumber'}
                      conditionalQuestion='UK landline or mobile telephone number'
                      conditionalInput={(val) => setSelectedNumber(val)}
                      conditionalError={error}
                    />
                  </fieldset>
                </div>
                <Button
                  className='govuk-button'
                  text='Continue'
                  onClick={handleSubmit}
                />
                <br />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
