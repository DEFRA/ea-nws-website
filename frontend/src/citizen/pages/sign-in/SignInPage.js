import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { backendCall } from '../../../common/services/BackendService'
import { emailValidation } from '../../../common/services/validations/EmailValidation'

export default function SignInPage () {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

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
        navigate('/signin/validate', {
          state: { signinToken: data.signinToken, email }
        })
      }
    }
  }

  return (
    <>
          <Link onClick={() => navigate(-1)} className='govuk-back-link'>
            Back
          </Link>
          <ErrorSummary errorList={error === '' ? [] : [error]} />
          <h2 class='govuk-heading-l'>
            Sign in to your flood warnings account
          </h2>
          <div class='govuk-body'>
            You can:
            <ul className='govuk-list govuk-list--bullet'>
              <li>update or remove your locations</li>
              <li>change how you get flood messages</li>
              <li>delete your account</li>
            </ul>
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
    </>
  )
}
