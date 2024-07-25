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
} from '../../../../services/ProfileServices'
import { normalisePhoneNumber } from '../../../../services/formatters/NormalisePhoneNumber'
import Radio from '../../../../gov-uk-components/Radio'

export default function AlreadyEnteredMobileOptions () {
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
        <Link className='govuk-back-link'>
          Back
        </Link>
        <main className='govuk-main-wrapper'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              {error? 
              <ErrorSummary errorList={error === '' ? [] : [error]} />
              :
              <></>
              }
              
              <h2 class='govuk-heading-l'>
                Which telephone number do you want to use to get
                flood messages by phone call?
              </h2>
              <div class='govuk-body'>
                <p>
                  We recommend using a landline or mobile number that can be called 24
                  hours a day
                </p>

                
                   
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
