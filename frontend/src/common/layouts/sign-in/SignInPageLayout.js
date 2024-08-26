import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { backendCall } from '../../../common/services/BackendService'
import { emailValidation } from '../../../common/services/validations/EmailValidation'

export default function SignInPageLayout ({ NavigateToNextPage }) {
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
      } else {
        NavigateToNextPage({ signinToken: data.signinToken, email })
      }
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
           {error && <ErrorSummary errorList={[error]} />}
            {location.pathname.includes('organisation') ? <h1 class='govuk-heading-l'>Sign in to your organisation's flood warning account</h1> : <h1 class='govuk-heading-l'>Sign in to your flood warnings account</h1>}
            <div class='govuk-body'>
              <Input
                className='govuk-input govuk-input--width-10'
                name='Email address'
                inputType='text'
                error={error}
                onChange={(val) => setEmail(val)}
              />
              <Button
                className='govuk-button'
                text='Continue'
                onClick={handleSubmit}
              />
              <br />
              <Link to='/signup' className='govuk-link'>
                Sign up if you do not have an account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
