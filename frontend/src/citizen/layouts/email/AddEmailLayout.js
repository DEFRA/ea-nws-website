import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { setCurrentContact, setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { addUnverifiedContact } from '../../../common/services/ProfileServices'
import { emailValidation } from '../../../common/services/validations/EmailValidation'

export default function AddEmailLayout({ navigateToNextPage }) {
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
      const profile = addUnverifiedContact(session.profile, 'email', email)
      const profileDataToSend = { profile, authToken }
      const { errorMessage, data } = await backendCall(
        profileDataToSend,
        'api/profile/update',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage)
      } else {
        dispatch(setProfile(data.profile))
        const { errorMessage } = await backendCall(
          dataToSend,
          'api/add_contact/email/add',
          navigate
        )
        if (errorMessage !== null) {
          setError(errorMessage)
        } else {
          dispatch(setCurrentContact(email))
          navigateToNextPage()
        }
      }
    }
  }

  // if user is going back through the signup flow - we want to remove the landline
  // from either the verified or unverified list - we need to do both incase
  // they progressed past the validate landline path
  const handleBackLink = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={handleBackLink} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && (
              <ErrorSummary
                errorList={[{ text: error, href: '#email-address' }]}
              />
            )}
            <h2 className='govuk-heading-l'>
              Enter an email address to get flood messages
            </h2>
            <div className='govuk-body'>
              <p>
                We recommend using an email address you can access 24 hours a
                day.
              </p>
              <Input
                id='email-address'
                name='Email address'
                inputType='text'
                inputMode='email'
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
