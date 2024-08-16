import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import Input from '../../../gov-uk-components/Input'
import InsetText from '../../../gov-uk-components/InsetText'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import { setAuthToken, setProfile, setRegisterToken } from '../../../redux/userSlice'
import { backendCall } from '../../../services/BackendService'
import { authCodeValidation } from '../../../services/validations/AuthCodeValidation'
import NotificationBanner from '../../../gov-uk-components/NotificationBanner'
import ExpiredCodeLayout from '../../../common-layouts/expired-code/ExpiredCodeLayout'
import { updateAdditionals } from '../../../services/ProfileServices'

export default function SignUpValidationPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const registerToken = useSelector((state) => state.session.registerToken)
  const loginEmail = useSelector((state) => state.session.profile.emails[0])
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [codeResent, setCodeResent] = useState(false)
  const [codeResentTime, setCodeResentTime] = useState(new Date())
  const [codeExpired, setCodeExpired] = useState(false)
  const session = useSelector((state) => state.session)
  const profile = session.profile

  // if error remove code sent notification
  useEffect(() => {
    setCodeResent(false)
  }, [error])

  const handleSubmit = async () => {
    const validationError = authCodeValidation(code)
    setError(validationError)

    if (validationError === '') {
      const dataToSend = {
        registerToken,
        code
      }

      const { data, errorMessage } = await backendCall(
        dataToSend,
        'api/sign_up_validate',
        navigate
      )

      if (errorMessage !== null) {
        if (errorMessage === 'The code you have entered has expired - please request a new code') {
          setCodeExpired(true)
        } else {
          setError(errorMessage)
        }
      } else {
        dispatch(setAuthToken(data.authToken))
        const updatedProfile = updateAdditionals(profile, [{ id: 'lastAccessedUrl', value: '/signup/accountname/add' }])
        dispatch(setProfile(updatedProfile))
        navigate('/signup/contactpreferences')
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const dataToSend = { email: loginEmail }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/sign_up_start',
      navigate
    )

    if (errorMessage !== null) {
      setError(errorMessage)
    } else {
      dispatch(setRegisterToken(data.registerToken))
      setCodeResent(true)
      setCodeResentTime(new Date().toLocaleTimeString())
      setCodeExpired(false)
    }
  }

  return (
    <>
      {codeExpired
        ? (<ExpiredCodeLayout getNewCode={getNewCode} />)
        : (
          <div className='page-container'>
            <Header />
            <div className='govuk-width-container body-container'>
              <PhaseBanner />
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-two-thirds'>
                  <Link to='/signup' className='govuk-back-link'>Back</Link>
                  {codeResent &&
                    <NotificationBanner
                      className='govuk-notification-banner govuk-notification-banner--success'
                      title='Success'
                      text={'New code sent at ' + codeResentTime}
                    />}
                  {error && <ErrorSummary errorList={[error]} />}
                  <h2 className='govuk-heading-l'>Check your email</h2>
                  <div className='govuk-body'>
                    <p>You need to confirm your email address.</p>
                    <p className='govuk-!-margin-top-6'>We've sent an email with a code to:</p>
                    <InsetText text={loginEmail} />
                    Enter the code within 4 hours or it will expire.
                    <div className='govuk-!-margin-top-6'>
                      <Input
                        className='govuk-input govuk-input--width-10'
                        inputType='text'
                        value={code}
                        name='Enter code'
                        error={error}
                        onChange={(val) => setCode(val)}
                      />
                    </div>
                    <Button
                      className='govuk-button'
                      text='Confirm email address'
                      onClick={handleSubmit}
                    />
                    &nbsp; &nbsp;
                    <Link
                      to='/signup'
                      className='govuk-link'
                      style={{
                        display: 'inline-block',
                        padding: '8px 10px 7px'
                      }}
                    >
                      Use a different email
                    </Link>
                    <div className='govuk-!-margin-top-1'>
                      <Link
                        onClick={getNewCode}
                        className='govuk-link'
                        style={{
                          display: 'inline-block'
                        }}
                      >
                        Get a new code
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
          )}
    </>
  )
}
