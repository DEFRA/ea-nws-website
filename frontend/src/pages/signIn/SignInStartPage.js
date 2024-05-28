import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import backendCall from '../../services/BackendService'
import emailValidation from '../../services/Validations/EmailValidation'

export default function SignInStartPage () {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = emailValidation(email)
    setError(validationError)
    if (validationError !== '') {
      return
    }
    const { emailExists, signinToken } = await checkEmail(email)
    if (!emailExists) {
      setError('Email address is not recognised - check and try again')
      return
    }
    navigate('/signin/validate', {
      state: { signinToken, email }
    })
  }

  const checkEmail = async (email) => {
    const data = { email }
    const responseData = await backendCall(data, 'signInStart')

    if (responseData === undefined) {
      return { emailExists: false, signinToken: null }
    }
    const code = responseData.status
    if (code !== 200) {
      return { emailExists: false, signinToken: null }
    }
    return { emailExists: true, signinToken: responseData.data.signinToken }
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
          <Input
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
          <Link to='/register' className='govuk-link'>
            Sign up if you do not have an account
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
