import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import InsetText from '../../gov-uk-components/InsetText'
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
  DifferentEmail
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
        dispatch(setProfile(data.profile))
        NavigateToNextPage()
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
      <Header />
      <div class='govuk-width-container'>
        <Link to='/managecontacts/add-email' className='govuk-back-link'>
          Back
        </Link>
        <main className='govuk-main-wrapper'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              {error !== '' ? <ErrorSummary errorList={[error]} /> : <></>}
              <h2 class='govuk-heading-l'>Check your email</h2>
              <div class='govuk-body'>
                We've sent a code to:
                <InsetText text={email} />
                Use the code within 4 hours or it will expire.
                <br /> <br />
                <Input
                  name='Enter code'
                  inputType='text'
                  error={error}
                  onChange={(val) => setCode(val)}
                />
                <Button
                  className='govuk-button'
                  text='Continue'
                  onClick={handleSubmit}
                />
                <Link
                  onClick={skipValidation}
                  className='govuk-link'
                  style={{
                    display: 'inline-block',
                    padding: '8px 10px 7px'
                  }}
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
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
