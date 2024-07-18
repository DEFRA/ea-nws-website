import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import { addUnverifiedContact } from '../../services/ProfileServices'
import { emailValidation } from '../../services/validations/EmailValidation'

export default function ChangeEmailPage () {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)
  const authToken = session.authToken

  const handleSubmit = async (event) => {
    const validationError = emailValidation(email)
    setError(validationError)
    const dataToSend = { email, authToken }
    if (validationError === '') {
      if (session.profile.emails[0] === email) {
        setError('Enter a different email address to the one you currently sign in with')
      } else {
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
          navigate('/account/change-email/validate')
        }
      }
    }
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <Link to='/account' className='govuk-back-link govuk-!-margin-bottom-0 govuk-!-margin-top-0'>
            Back
          </Link>
          <main className='govuk-main-wrapper govuk-!-padding-top-4'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-full'>
                {error && <ErrorSummary errorList={[error]} />}
                <h2 className='govuk-heading-l'>
                  Change your email address for signing in
                </h2>
                <div className='govuk-body'>
                  <p className='govuk-body'>
                    We'll use this email if we need to contact you about your account.
                  </p>
                  <p className='govuk-body'>
                    This email is also your sign-in name for this service
                  </p>
                  <p className='govuk-body govuk-!-margin-bottom-8'>
                    If you change it here, use your new email when you next sign in
                  </p>
                  <Input
                    className='govuk-input govuk-!-width-one-half'
                    inputType='text'
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
                  >
                    Cancel
                  </Link>
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
