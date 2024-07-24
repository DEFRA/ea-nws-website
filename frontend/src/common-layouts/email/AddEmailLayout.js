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
import { addUnverifiedContact } from '../../services/ProfileServices'
import { emailValidation } from '../../services/validations/EmailValidation'

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
        NavigateToNextPage()
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
      <div className='page-container'>
        <Header />
        <div class='govuk-width-container body-container'>
          <Link onClick={handleBackLink} className='govuk-back-link'>
            Back
          </Link>
          <main className='govuk-main-wrapper'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                {error && <ErrorSummary errorList={[error]} />}
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
        </div>
        <Footer />
      </div>
    </>
  )
}
