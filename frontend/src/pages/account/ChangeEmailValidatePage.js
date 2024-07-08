import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import {
  removeUnverifiedContact
} from '../../services/ProfileServices'
import { authCodeValidation } from '../../services/validations/AuthCodeValidation'

export default function ChangeEmailValidationPage () {
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const authToken = useSelector((state) => state.session.authToken)
  const session = useSelector((state) => state.session)
  const email = session.profile.unverified.emails[0]
    ? session.profile.unverified.emails[0]
    : session.profile.emails[0]

  const updateProfile = async (profile, authToken) => {
    const profileEmails = profile.emails
    const emailsLength = profileEmails.length
    profileEmails[0] = profileEmails[emailsLength - 1]
    profileEmails.pop()
    profile.emails = profileEmails

    const dataToSend = { profile, authToken }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/profile/update',
      navigate
    )

    if (errorMessage !== null) {
      setError(errorMessage)
    } else {
      dispatch(setProfile(profile))
      navigate('/account', {
        state: {
          changeEmail: true,
          email: profile.emails[0]
        }
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const dataToSend = { authToken, email, code }
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/add_contact/email/validate'
      )
      if (errorMessage !== null) {
        setError(errorMessage)
      } else {
        updateProfile(data.profile, authToken)
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const data = { authToken: session.authToken, email }
    const { errorMessage } = await backendCall(
      data,
      'api/add_contact/email/add',
      navigate
    )
    if (errorMessage !== null) {
      setError(errorMessage)
    }
  }

  const differentEmail = (event) => {
    event.preventDefault()
    // remove email from users profile
    dispatch(setProfile(removeUnverifiedContact(session.profile, email)))
    navigate('/account/change-email')
  }

  return (
    <>
      <Header />
      <div class='govuk-width-container'>
        <PhaseBanner />
        <Link to='/account/change-email' className='govuk-back-link govuk-!-margin-bottom-0 govuk-!-margin-top-0'>
          Back
        </Link>
        <main className='govuk-main-wrapper'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <ErrorSummary errorList={error === '' ? [] : [error]} />
              <h2 class='govuk-heading-l'>Check your email</h2>
              <div className='govuk-body'>
                <p className='govuk-body'>
                  You need to confirm your email address.
                </p>
                <p className='govuk-body govuk-!-margin-bottom-5'>
                  We've sent an email with a code to:
                  <InsetText text={email} />
                  Use the code within 4 hours or it will expire.
                </p>
                <Input
                  className='govuk-input govuk-input--width-10'
                  name='Enter code'
                  inputType='text'
                  error={error}
                  onChange={(val) => setCode(val)}
                />
                <Button
                  className='govuk-button'
                  text='Confirm email address'
                  onClick={handleSubmit}
                />
                <Link
                  onClick={differentEmail}
                  className='govuk-link inline-link'
                >
                  Use a different email
                </Link>
                <br />
                <Link onClick={getNewCode} className='govuk-link'>
                  Get a new code
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
