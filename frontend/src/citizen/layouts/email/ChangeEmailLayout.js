import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { setCurrentContact, setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { addUnverifiedContact } from '../../../common/services/ProfileServices'
import { emailValidation } from '../../../common/services/validations/EmailValidation'

export default function ChangeEmailLayout({
  navigateToNextPage,
  NavigateToPreviousPage
}) {
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
      if (session.profile.emails[0] === email) {
        setError(
          'Enter a different email address to the one you currently sign in with'
        )
      } else {
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
  }

  const handleBackLink = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <Helmet>
        <title>
          Change your email address for signing in - Get flood warnings - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={handleBackLink} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            {error && <ErrorSummary errorList={[error]} />}
            <h2 className='govuk-heading-l'>
              Change your email address for signing in
            </h2>
            <div className='govuk-body'>
              <p className='govuk-body'>
                We'll use this email if we need to contact you about your
                account.
              </p>
              <p className='govuk-body'>
                This email is also your sign-in name for this service
              </p>
              <p className='govuk-body govuk-!-margin-bottom-8'>
                If you change it here, use your new email when you next sign in
              </p>
              <Input
                id='new-email-address'
                className='govuk-input govuk-!-width-one-half'
                inputType='text'
                inputMode='email'
                name='New email address'
                error={error}
                onChange={(val) => setEmail(val)}
              />
              <Button
                className='govuk-button'
                text='Save changes'
                onClick={handleSubmit}
              />
              <Link
                to='/account'
                className='govuk-link inline-link'
                style={{ cursor: 'pointer' }}
              >
                Cancel
              </Link>
              <br />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
