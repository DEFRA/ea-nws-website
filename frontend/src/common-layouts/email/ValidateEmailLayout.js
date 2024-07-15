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
  addUnverifiedContact,
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../services/ProfileServices'
import { authCodeValidation } from '../../services/validations/AuthCodeValidation'

export default function ValidateEmailLayout ({
  NavigateToNextPage,
  SkipValidation,
  DifferentEmail,
  NavigateToPreviousPage,
  buttonText,
  changeSignIn,
  updateProfile,
  profileError
}) {
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const authToken = useSelector((state) => state.session.authToken)
  const session = useSelector((state) => state.session)
  const email = session.profile.unverified.emails[0]
    ? session.profile.unverified.emails[0]
    : session.profile.emails[0]

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
        if (changeSignIn) {
          updateProfile(data.profile, authToken)
          setError(profileError)
        } else {
          dispatch(setProfile(data.profile))
          NavigateToNextPage()
        }
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

  const skipValidation = (event) => {
    event.preventDefault()
    // remove email from verified list if user is going back after validating

    const updatedProfile = removeVerifiedContact(session.profile, email)
    // we will need to add the email back to the unverified list - if it already exists
    // nothing will happen and it will remain
    dispatch(setProfile(addUnverifiedContact(updatedProfile, 'email', email)))
    SkipValidation(email)
  }

  const differentEmail = (event) => {
    event.preventDefault()
    // remove email from users profile
    dispatch(setProfile(removeUnverifiedContact(session.profile, email)))
    DifferentEmail(email)
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <Link onClick={NavigateToPreviousPage} className='govuk-back-link govuk-!-margin-bottom-0 govuk-!-margin-top-0'>
            Back
          </Link>
          <main className='govuk-main-wrapper'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                {error && <ErrorSummary errorList={[error]} />}
                <h2 className='govuk-heading-l'>Check your email</h2>
                <div className='govuk-body'>
                  {changeSignIn && (
                    <p className='govuk-body'>
                      You need to confirm your email address.
                    </p>
                  )}
                  <p className='govuk-body govuk-!-margin-bottom-5'>
                    We've sent an email with a code to:
                    <InsetText text={email} />
                    {changeSignIn ? 'Enter' : 'Use'} the code within 4 hours or it will expire.
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
                    text={buttonText}
                    onClick={handleSubmit}
                  />
                  {changeSignIn
                    ? (
                      <>
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
                      </>
                      )
                    : (
                      <>
                        <Link
                          onClick={skipValidation}
                          className='govuk-link inline-link'
                        >
                          Skip and confirm later
                        </Link>
                        <br />
                        <Link onClick={getNewCode} className='govuk-link'>
                          Get a new code
                        </Link>
                        <br /> <br />
                        <Link onClick={differentEmail} className='govuk-link'>
                          Enter a different email
                        </Link>
                      </>
                      )}
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
