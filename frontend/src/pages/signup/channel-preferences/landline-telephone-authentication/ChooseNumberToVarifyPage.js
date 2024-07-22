/* eslint-disable no-use-before-define */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import ErrorSummary from '../../../../gov-uk-components/ErrorSummary'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import Input from '../../../../gov-uk-components/Input'
import { setProfile } from '../../../../redux/userSlice'
import { backendCall } from '../../../../services/BackendService'
import {
  addUnverifiedContact,
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../../../services/ProfileServices'
import { normalisePhoneNumber } from '../../../../services/formatters/NormalisePhoneNumber'
import Radio from '../../../../gov-uk-components/Radio'

export default function ChooseNumberToVarifyPage () {
  const navigate = useNavigate()
  const [landline, setLandline] = useState('')
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)
  const authToken = useSelector((state) => state.session.authToken)
  const unverifiedMobileNumbers = session.profile.unverified.mobilePhones
  const verifiedMobileNumbers = session.profile.mobilePhones
  const mobileNumbers = [...unverifiedMobileNumbers, ...verifiedMobileNumbers]

  const handleSubmit = async (event) => {
    event.preventDefault()

    let validationError = ''
    if (isChecked === false) {
      validationError = 'Which telephone number do you want to use?'
    }
    setError(validationError)
    if (validationError === '') {
      const normalisedPhoneNumber = normalisePhoneNumber(landline)
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
            addUnverifiedContact(
              session.profile,
              'homePhones',
              normalisedPhoneNumber
            )
          )
        )
        if (isOpen === true) {
          navigate('/signup/contactpreferences/landline/validate')
        } else {
          console.log(normalisedPhoneNumber)
          if (verifiedMobileNumbers.includes(normalisedPhoneNumber)) {
            navigate('/signup/accountname/add')
          } else {
            navigate('/signup/contactpreferences/landline/validate')
          }
        }
      }
    }
  }

  // if user is going back through the signup flow - we want to remove the landline
  // from either the verified or unverified list - we need to do both incase
  // they progressed past the validate landline path
  const removeLandlineFromProfile = async (event) => {
    event.preventDefault()
    // we need to check if location.state has a value - this will only hold a value
    // if the user has come from the landline validate page - we will need to remove
    // the number from the users profile if so
    if (session && session.landline) {
      event.preventDefault()
      const normalisedLandline = normalisePhoneNumber(session.landline)
      // remove landline from users profile
      const updatedProfile = removeUnverifiedContact(
        session.profile,
        normalisedLandline
      )
      dispatch(
        setProfile(removeVerifiedContact(updatedProfile, normalisedLandline))
      )
    }
    // user could have navigated from contact preferences page
    // or user could have come from account change details at the end of sign up flow
    navigate('/signup/contactpreferences/landline/validate')
  }

  const hasAddedMobileAlready = () => {
    const phone = session.profile.unverified.mobilePhones
    const verifiedPhone = session.profile.mobilePhones
    if (phone[0] !== undefined || verifiedPhone[0] !== undefined) {
      return true
    } else { return false }
  }
  const setLandlineprefernce = (event) => {
    setLandline(event.target.value)
    setIsOpen(false)
    setIsChecked(true)
    setError('')
  }
  const toggle = () => {
    setIsOpen((isOpen) => !isOpen)
    setIsChecked(true)
    setLandline('')
    setError('')
  }

  return (
    <>
      <Header />
      <div class='govuk-width-container'>
        <Link onClick={removeLandlineFromProfile} className='govuk-back-link'>
          Back
        </Link>
        <main className='govuk-main-wrapper'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <ErrorSummary errorList={error === '' ? [] : [error]} />
              <h2 class='govuk-heading-l'>
                Enter a telephone number to get flood messages by phone call
              </h2>
              <div class='govuk-body'>
                <p>
                  We recommend using a landline or mobile number that can be called 24
                  hours a day.
                </p>

                {hasAddedMobileAlready()
                  ? <>
                    <div
                      className={
                  error && isOpen !== true
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
                    >

                      <fieldset className='govuk-fieldset'>
                        {error && isOpen === false && <p className='govuk-error-message'>{error}</p>}
                        <div className='govuk-radios' data-module='govuk-radios'>
                          {mobileNumbers.map((mobileNumbers) => (
                            <Radio
                              key={mobileNumbers}
                              id={mobileNumbers}
                              name='feedbackRadios'
                              label={mobileNumbers}
                              type='radio'
                              value={mobileNumbers}
                              onChange={setLandlineprefernce}
                            />
                          ))}

                          <Radio
                            key='number'
                            id='different number'
                            name='feedbackRadios'
                            label='A different number'
                            type='radio'
                            value='A different number'
                            onChange={toggle}
                          />

                          <div className='govuk-radios__conditional govuk-radios__conditional--hidden'>
                            {isOpen &&
                              <Input
                                name='UK landline or mobile telephone number'
                                inputType='text'
                                error={error}
                                onChange={(val) => setLandline(val)}
                                className='govuk-input govuk-input--width-20'
                              />}
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <Button
                      className='govuk-button'
                      text='Continue'
                      onClick={handleSubmit}
                    />
                    </>
                  : navigate('/signup/contactpreferences/landline/add')}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
