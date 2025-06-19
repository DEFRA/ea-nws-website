/* eslint-disable no-use-before-define */
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import Radio from '../../../common/components/gov-uk/Radio'
import { setCurrentContact, setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  addUnverifiedContact,
  addVerifiedContact
} from '../../../common/services/ProfileServices'
import { normalisePhoneNumber } from '../../../common/services/formatters/NormalisePhoneNumber'
import { phoneValidation } from '../../../common/services/validations/PhoneValidation'

export default function SelectAlternativeLandlineLayout({
  NextPageWithoutValidation,
  NextPageWithValidation,
  NavigateBack
}) {
  const navigate = useNavigate()
  const [selectedNumber, setSelectedNumber] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [error, setError] = useState('')
  const [optionError, setOptionError] = useState('')
  const [validationError, setValidationError] = useState('')
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.session.profile)
  const authToken = useSelector((state) => state.session.authToken)
  const location = useLocation()

  const unverifiedMobileNumbers = []
  profile.unverified &&
    profile.unverified?.mobilePhones?.forEach((entry) => {
      unverifiedMobileNumbers.push(entry.address)
    })
  const verifiedMobileNumbers = profile.mobilePhones
  const mobileNumbers = [...unverifiedMobileNumbers, ...verifiedMobileNumbers]

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!selectedOption) {
      setOptionError('Which telephone number do you want to use?')
      return
    }
    setOptionError('') // Clear previous error

    if (selectedOption === 'otherNumber') {
      // No input at all
      if (!selectedNumber.trim()) {
        setValidationError('Enter a UK landline or telephone number')
        return
      }

      const phoneValidationErrors = phoneValidation(
        selectedNumber,
        'mobileAndLandline'
      )
      // Invalid number input
      if (phoneValidationErrors) {
        setValidationError(
          'Enter a UK landline or mobile telephone number, like 01632 960 001 or 07700 900 982 or 08000 07700 900 982 if you’re using an RNIB number'
        )
        return
      }
    }
    setValidationError('') // Clear previous error

    const normalisedPhoneNumber = normalisePhoneNumber(selectedNumber)
    if (verifiedMobileNumbers.includes(normalisedPhoneNumber)) {
      const updatedProfile = addVerifiedContact(
        profile,
        'homePhones',
        normalisedPhoneNumber
      )
      dispatch(setProfile(updatedProfile))
      updateBackEndProfile(updatedProfile)
      NextPageWithoutValidation()
    } else {
      const updatedProfile = addUnverifiedContact(
        profile,
        'homePhones',
        normalisedPhoneNumber
      )
      dispatch(setProfile(updatedProfile))
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
      NextPageWithValidation()
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
  const handleBackLink = () => {
    NavigateBack()
  }

  return (
    <>
      <Helmet>
        <title>
          Select a telephone number to get flood messages by phone call - Get
          flood warnings - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={handleBackLink} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(error || optionError || validationError) && (
              <ErrorSummary errorList={[error, optionError, validationError]} />
            )}
            {location?.state?.banner && (
              <NotificationBanner
                className='govuk-notification-banner govuk-notification-banner--success'
                title='Success'
                heading={location?.state?.banner?.heading}
                text={location?.state?.banner?.text}
              />
            )}
            <h2 className='govuk-heading-l' id='main-content'>
              Which telephone number do you want to use to get flood messages by
              phone call?
            </h2>
            <div className='govuk-body'>
              <p>
                We recommend using a landline or mobile number that can be
                called 24 hours a day
              </p>

              <div
                className={
                  optionError
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                <fieldset className='govuk-fieldset'>
                  {optionError && (
                    <p className='govuk-error-message'>{optionError}</p>
                  )}
                  {mobileNumbers.map((mobileNumber, index) => (
                    <div
                      style={{ display: 'block' }}
                      key={mobileNumber + '.' + index}
                    >
                      <div
                        className='govuk-!-padding-bottom-4'
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >
                        <Radio
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
                        {unverifiedMobileNumbers.some(
                          (unverifiedMobileNumber) =>
                            unverifiedMobileNumber.address === mobileNumber
                        ) && (
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
                    conditionalError={validationError}
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
    </>
  )
}
