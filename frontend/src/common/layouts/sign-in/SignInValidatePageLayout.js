import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import InsetText from '../../../common/components/gov-uk/InsetText'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import {
  setAuthToken,
  setProfile,
  setRegistrations
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { authCodeValidation } from '../../../common/services/validations/AuthCodeValidation'
import ExpiredCodeLayout from '../../../citizen/layouts/expired-code/ExpiredCodeLayout'

export default function SignInValidatePageLayout ({ NavigateToNextPage, NavigateToPreviousPage }) {
  const location = useLocation()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const signinToken = location.state.signinToken
  const [codeResent, setCodeResent] = useState(false)
  const [codeResentTime, setCodeResentTime] = useState(new Date())
  const [codeExpired, setCodeExpired] = useState(false)

  // if error remove code sent notification
  useEffect(() => {
    setCodeResent(false)
  }, [error])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const dataToSend = { signinToken, code }
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/sign_in_validate'
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
        NavigateToNextPage()
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const data = { email: location.state.email }
    const { errorMessage } = await backendCall(data, 'api/sign_in', navigate)

    if (errorMessage !== null) {
      setError(errorMessage)
    }

    setCodeResent(true)
    setCodeResentTime(new Date().toLocaleTimeString())
    setCodeExpired(false)
  }

  const navigateBack = async (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      {codeExpired
        ? (<ExpiredCodeLayout getNewCode={getNewCode} />)
        : (
          <>
            <BackLink onClick={navigateBack} />
            {codeResent &&
              <NotificationBanner
                className='govuk-notification-banner govuk-notification-banner--success'
                title='Success'
                text={'New code sent at ' + codeResentTime}
              />}
            <main className='govuk-main-wrapper govuk-!-padding-top-4'>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-two-thirds'>
                  {error && <ErrorSummary errorList={[error]} />}
                  <h2 class='govuk-heading-l'>Check your email</h2>
                  <div class='govuk-body'>
                    We've sent a code to:
                    <InsetText text={location.state.email} />
                    <Input
                      className='govuk-input govuk-input--width-10'
                      name='Enter code'
                      inputType='text'
                      value={code}
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
              </div>
            </main>
          </>
          )}
    </>
  )
}
