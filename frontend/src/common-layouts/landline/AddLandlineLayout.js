import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import { setProfile } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import {
  addUnverifiedContact,
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../services/ProfileServices'
import { normalisePhoneNumber } from '../../services/formatters/NormalisePhoneNumber'
import { phoneValidation } from '../../services/validations/PhoneValidation'
import CheckboxRadios from '../../gov-uk-components/CheckBoxRadios'
import { useEffect } from 'react'
export default function AddLandlineLayout ({ NavigateToNextPage, NavigateToPreviousPage }) {
  const navigate = useNavigate()
  const [landline, setLandline] = useState('')
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)
  const authToken = useSelector((state) => state.session.authToken)
  
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (hasAddedLandLineAlready() === false) {
      const validationError = phoneValidation(landline, 'mobileAndLandline')
      setError(validationError)
      setLandlineProfile(validationError)
    } else if (isOpen === false && landline === '') {
      const validationError = setError('Which telephone number do you want to use?')
      setLandlineProfile(validationError)
    } else {
      const validationError = phoneValidation(landline, 'mobileAndLandline')
      setError(validationError)
      setLandlineProfile(validationError)
    }
  }

  const setLandlineProfile = async (validationError) => {
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
        // remove number so when the dispatch bellow is called it addsthe number back to array (should be at the back)
        dispatch(
          setProfile(
            removeUnverifiedContact(session.profile,
              normalisedPhoneNumber)
          )
        )
        // when adding a new number in input box it adds to the back of array as it should and works
        // however when radio button is pressed it adds the number back to the place it was originally in
        dispatch(
          setProfile(
            addUnverifiedContact(
              session.profile,
              'homePhones',
              normalisedPhoneNumber
            )
          )
        )
        NavigateToNextPage()
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
    NavigateToPreviousPage()
  }

  const homePhone = session.profile.unverified.homePhones[0]
    ? session.profile.unverified.homePhones[0]
    : session.profile.homePhones[0]

  const hasAddedLandLineAlready = () => {
    if (homePhone === undefined) {
      return false
    } else {
      return true
    }
  }

  // placeholder for now until its implimented
  // const mobileNumbers = [{ number: '07897645546' },
  //   { number: '01269081694' }
  // ]
  const mobileNumbers = session.profile.unverified.homePhones

  const setLandlineprefernce = (event) => {
    setLandline(event.target.value)
    setIsOpen(false)
    setError('')

  }
  const toggle = () => {
    setIsOpen((isOpen) => !isOpen)
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
                {hasAddedLandLineAlready()
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
                            <CheckboxRadios
                              key={mobileNumbers}
                              id={mobileNumbers}
                              name='feedbackRadios'
                              label={mobileNumbers}
                              type='radio'
                              value={mobileNumbers}
                              onChange={setLandlineprefernce}
                            />
                          ))}

                          <CheckboxRadios
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
                  : <>
                    <Input
                      name='UK landline or mobile telephone number'
                      inputType='text'
                      error={error}
                      onChange={(val) => setLandline(val)}
                      className='govuk-input govuk-input--width-20'
                    />
                    <Button
                      className='govuk-button'
                      text='Continue'
                      onClick={handleSubmit}
                    />
                  </>}
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