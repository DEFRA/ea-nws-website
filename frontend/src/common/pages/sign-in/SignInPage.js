import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import Button from '../../components/gov-uk/Button'
import ErrorSummary from '../../components/gov-uk/ErrorSummary'
import Input from '../../components/gov-uk/Input'
import { backendCall } from '../../services/BackendService'
import { emailValidation } from '../../services/validations/EmailValidation'

export default function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const location = useLocation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = emailValidation(email)
    setError(validationError)
    const dataToSend = { email }
    if (validationError === '') {
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/sign_in',
        navigate
      )

      if (errorMessage !== null) {
        setError(errorMessage)
        if (
          errorMessage ===
            'Email address not recognised - check and try again' &&
          location.pathname.includes('organisation')
        ) {
          navigate('/sign-in/organisation/account-pending')
        }
      } else {
        navigate('/sign-in/validate/', {
          state: { signinToken: data.signinToken, email }
        })
      }
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[{text: error, href: '#email-address'}]} />}
            <h1 className='govuk-heading-l'>
              Sign in to your flood warnings account
            </h1>
            <div className='govuk-body'>
              <Input
                id='email-address'
                className='govuk-input govuk-input--width-30'
                name='Email address'
                inputType='text'
                inputMode='email'
                error={error}
                onChange={(val) => setEmail(val)}
              />
              <Button
                className='govuk-button'
                text='Continue'
                onClick={handleSubmit}
              />
              <br />
              <Link to='/signup/service-selection' className='govuk-link'>
                Sign up if you do not have an account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
