/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import Radio from '../../../../gov-uk-components/Radio'
import { setCurrentContact, setProfile } from '../../../../redux/userSlice'
import { backendCall } from '../../../../services/BackendService'
import { addUnverifiedContact } from '../../../../services/ProfileServices'
import { normalisePhoneNumber } from '../../../../services/formatters/NormalisePhoneNumber'

export default function SelectAlternativeLandlinePage() {
  const navigate = useNavigate()
  const [landline, setLandline] = useState('')
  const [alternativeLandline, setAlternativeLandline] = useState('')
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.session.profile)
  const authToken = useSelector((state) => state.session.authToken)

  const unverifiedMobileNumbers = profile.unverified.mobilePhones
  const verifiedMobileNumbers = profile.mobilePhones
  const mobileNumbers = [...unverifiedMobileNumbers, ...verifiedMobileNumbers]

  useEffect(() => {
    setValidationError('')
    setError('')
  }, [landline])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!landline && !alternativeLandline) {
      setValidationError('Which telephone number do you want to use?')
      return
    }

    if (validationError === '') {
      let normalisedPhoneNumber = ''
      if (alternativeLandline !== '') {
        normalisedPhoneNumber = normalisePhoneNumber(alternativeLandline)
      } else {
        normalisedPhoneNumber = normalisePhoneNumber(landline)
      }

      const dataToSend = { msisdn: normalisedPhoneNumber, authToken }
      const { errorMessage } = await backendCall(
        dataToSend,
        'api/add_contact/landline/add',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage)
      } else {
        dispatch(
          setProfile(
            addUnverifiedContact(profile, 'homePhones', normalisedPhoneNumber)
          )
        )
        dispatch(setCurrentContact(normalisedPhoneNumber))
        if (error === '') {
          navigate('/signup/contactpreferences/landline/validate')
        } else {
          if (verifiedMobileNumbers.includes(normalisedPhoneNumber)) {
            navigate('/signup/accountname/add')
          } else {
            navigate('/signup/contactpreferences/landline/validate')
          }
        }
      }
    }
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
              <h2 class='govuk-heading-l'>
                Which telephone number do you want to use to get flood messages
                by phone call?
              </h2>
              <div class='govuk-body'>
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
                      <Radio
                        key={mobileNumber}
                        label={mobileNumber}
                        value={mobileNumber}
                        id={mobileNumber}
                        name='MobileNumbersRadios'
                        onChange={(e) => setLandline(e.target.value)}
                      />
                    ))}

                    <Radio
                      label='A different number'
                      value='otherLandlineNumber'
                      name='LandlineNumbersRadios'
                      onChange={(e) => setLandline(e.target.value)}
                      conditional={landline === 'otherLandlineNumber'}
                      conditionalQuestion='Uk landline or mobile telephone number'
                      conditionalInput={(val) => setAlternativeLandline(val)}
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
