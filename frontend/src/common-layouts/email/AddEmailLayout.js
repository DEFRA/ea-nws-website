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
import { emailValidation } from '../../services/validations/EmailValidation'

export default function AddEmailLayout ({ NavigateToNextPage }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)
  const authToken = session.authToken

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = emailValidation(email)
    setError(validationError)
    const dataToSend = { email, authToken }
    if (validationError === '') {
      const { errorMessage } = await backendCall(
        dataToSend,
        'api/add_contact/email/add',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage)
      } else {
        dispatch(
          setProfile(addUnverifiedContact(session.profile, 'email', email))
        )
        NavigateToNextPage()
      }
    }
  }

  // if user is going back through the signup flow - we want to remove the landline
  // from either the verified or unverified list - we need to do both incase
  // they progressed past the validate landline path
  const removeEmailFromProfile = async (event) => {
    event.preventDefault()
    // we need to check if location.state has a value - this will only hold a value
    // if the user has come from the landline validate page - we will need to remove
    // the number from the users profile if so
    if (session && session.email) {
      event.preventDefault()
      // remove landline from users profile
      const updatedProfile = removeUnverifiedContact(session.profile, email)
      dispatch(setProfile(removeVerifiedContact(updatedProfile, email)))
    }
    // user could have navigated from contact preferences page
    // or user could have come from account change details at the end of sign up flow
    navigate(-1)
  }

  return (
    <>
      <Header />
      <div class='govuk-width-container'>
        <Link onClick={removeEmailFromProfile} className='govuk-back-link'>
          Back
        </Link>
        <main className='govuk-main-wrapper'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              {error ? <ErrorSummary errorList={[error]} /> : <></>}
              <h2 class='govuk-heading-l'>
                Enter an email address to get flood messages
              </h2>
              <div class='govuk-body'>
                <p>
                  We recommend using an email address you can access 24 hours a
                  day.
                </p>
                <Input
                  name='Email address'
                  inputType='text'
                  error={error}
                  onChange={(val) => setEmail(val)}
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
    </>
  )
}
