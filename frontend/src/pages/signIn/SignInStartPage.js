import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import TextInput from '../../gov-uk-components/TextInput'
import backendCall from '../../services/BackendService'
import emailValidation from '../../services/Validations/EmailValidation'

export default function SignInStartPage () {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const signinToken = null
    if (email === '') {
      setError('Enter your email address')
      return
    } else if (!emailValidation(email)) {
      setError(
        'Enter an email address in the correct format, like name@example.com'
      )
      return
    }

    const { emailExists, signinToken: token } = await checkEmail(email)
    if (!emailExists) {
      setError('Email address is not recognised - check and try again')
      return
    }

    navigate('/signin/validate', {
      state: { signinToken, email }
    })
  }

  const checkEmail = async (email) => {
    const raw = JSON.stringify({ email })
    const responseData = await backendCall(raw, 'signInStart')

    if (responseData === undefined) {
      return { emailExists: false, signinToken: null }
    }
    const code = responseData.code
    if (code === 106) {
      return { emailExists: false, signinToken: null }
    }
    const signinToken = responseData.signinToken
    return { emailExists: true, signinToken }
  }

  return (
    <>
      <Header />
      <div class='govuk-width-container'>
        <Link to='/' className='govuk-back-link'>
          Back
        </Link>
        <ErrorSummary errorList={error === '' ? [] : [error]} />
        <h2 class='govuk-heading-l'>Sign in to your flood warnings account</h2>
        <div class='govuk-body'>
          You can:
          <ul className='govuk-list govuk-list--bullet'>
            <li>update or remove your locations</li>
            <li>change how you get flood messages</li>
            <li>delete your account</li>
          </ul>
          <TextInput name='Email address' error={error} onChange={setEmail} />
          <Button
            className='govuk-button'
            text='Continue'
            onClick={handleSubmit}
          />
          <br />
          <Link to='/' className='govuk-link'>
            Sign up if you do not have an account
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
