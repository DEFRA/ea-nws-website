import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import InsetText from '../../gov-uk-components/InsetText'
import {
  setAuthToken,
  setProfile,
  setRegistrations
} from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import { authCodeValidation } from '../../services/validations/AuthCodeValidation'
import NotificationBanner from '../../gov-uk-components/NotificationBanner'
import ExpiredCodeLayout from '../../common-layouts/expired-code/ExpiredCodeLayout'

export default function SignInValidatePage () {
  const location = useLocation()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const signinToken = location.state.signinToken
  const [codeResent, setCodeResent] = useState(false)
  const dateTime = new Date()
  const [codeExpired, setCodeExpired] = useState(false)
  const loginEmail = useSelector((state) => state.session.profile.emails[0])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const dataToSend = { signinToken, code }
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/signInValidate'
      )
      if (errorMessage !== null) {
        if (errorMessage === 'The code you have entered has expired - please request a new code') {
          setCodeExpired(true)
        } else {
          setError(errorMessage)
        }
      } else {
        dispatch(setAuthToken(data.authToken))
        dispatch(setProfile(data.profile))
        dispatch(setRegistrations(data.registrations))
        navigate('/home')
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    setCodeResent(false)

    const data = { email: loginEmail}
    const { errorMessage } = await backendCall(
      data,
      'api/signInStart',
      navigate
    )

    if (errorMessage !== null) {
      setError(errorMessage)
    }

    setCodeResent(true)
    setCodeExpired(false)
  }

  return (
    <>
      {codeExpired
        ? (<ExpiredCodeLayout getNewCode={getNewCode} />)
        : (
          <div>
            <Header />
            <div class='govuk-width-container'>
              <Link to='/signin' className='govuk-back-link'>Back</Link>
              {codeResent
                &&
                  <NotificationBanner
                    className='govuk-notification-banner govuk-notification-banner--success'
                    title='Success'
                    text={'New code sent at ' + dateTime.toLocaleTimeString()}
                  />
                  }
              {error  && <ErrorSummary errorList={[error]} />}
              <h2 class='govuk-heading-l'>Check your email</h2>
              <div class='govuk-body'>
                We've sent a code to:
                <InsetText text={loginEmail} />
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
                <br />
                <Link onClick={getNewCode} className='govuk-link'>
                  Get a new code
                </Link>
              </div>
            </div>
            <Footer />
          </div>
          )}
    </>
  )
}
