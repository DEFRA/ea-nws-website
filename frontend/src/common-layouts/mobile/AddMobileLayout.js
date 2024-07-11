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

export default function AddMobileLayout ({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)
  const authToken = useSelector((state) => state.session.authToken)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = phoneValidation(mobile, 'mobile')
    setError(validationError)
    if (validationError === '') {
      const normalisedPhoneNumber = normalisePhoneNumber(mobile)
      const dataToSend = { msisdn: normalisedPhoneNumber, authToken }
      const { errorMessage } = await backendCall(
        dataToSend,
        'api/add_contact/mobile/add',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage)
      } else {
        dispatch(
          setProfile(
            addUnverifiedContact(
              session.profile,
              'mobile',
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
  const removeMobileFromProfile = async (event) => {
    event.preventDefault()
    // we need to check if location.state has a value - this will only hold a value
    // if the user has come from the landline validate page - we will need to remove
    // the number from the users profile if so
    if (session && session.mobile) {
      event.preventDefault()
      const normalisedMobile = normalisePhoneNumber(session.mobile)
      // remove mobile from users profile
      const updatedProfile = removeUnverifiedContact(
        session.profile,
        normalisedMobile
      )
      dispatch(
        setProfile(removeVerifiedContact(updatedProfile, normalisedMobile))
      )
    }

    // user could have navigated from contact preferences page
    // or user could have come from account change details at the end of sign up flow
    NavigateToPreviousPage()
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div class='govuk-width-container body-container'>
          <Link onClick={removeMobileFromProfile} className='govuk-back-link'>
            Back
          </Link>
          <main className='govuk-main-wrapper'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <ErrorSummary errorList={error === '' ? [] : [error]} />
                <h2 class='govuk-heading-l'>
                  Enter a mobile number to get flood messages by text
                </h2>
                <div class='govuk-body'>
                  <p>
                    We recommend using a mobile number where we can reach you 24
                    hours a day.
                  </p>
                  <Input
                    name='UK mobile telephone number'
                    inputType='text'
                    error={error}
                    onChange={(val) => setMobile(val)}
                    className='govuk-input govuk-input--width-20'
                  />
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
      </div>
    </>
  )
}
