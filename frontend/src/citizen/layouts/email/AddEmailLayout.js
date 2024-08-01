import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { setCurrentContact, setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  addUnverifiedContact,
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../../common/services/ProfileServices'
import { emailValidation } from '../../../common/services/validations/EmailValidation'

export default function AddEmailLayout ({ NavigateToNextPage }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
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
        dispatch(setCurrentContact(email))
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
      <BackLink onClick={removeEmailFromProfile} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <ErrorSummary errorList={error === '' ? [] : [error]} />
            <h2 class='govuk-heading-l'>
              Enter an email address to get flood messages
            </h2>
            <div class='govuk-body'>
              <p>
                We recommend using an email address you can access 24 hours
                a day.
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
    </>
  )
}
