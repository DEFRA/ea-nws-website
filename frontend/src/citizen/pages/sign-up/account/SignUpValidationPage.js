import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../common/components/gov-uk/Input'
import InsetText from '../../../../common/components/gov-uk/InsetText'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'
import ExpiredCodeLayout from '../../../../common/layouts/email/ExpiredCodeLayout'
import {
  setAuthToken,
  setProfile,
  setRegisterToken
} from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import {
  getRegistrationParams,
  updateAdditionals
} from '../../../../common/services/ProfileServices'
import { authCodeValidation } from '../../../../common/services/validations/AuthCodeValidation'
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
        if (
          errorMessage ===
          'The code you have entered has expired - please request a new code'
        ) {
          setCodeExpired(true)
        } else {
          setError(errorMessage)
        }
      } else {
        dispatch(setAuthToken(data.authToken))
        let updatedProfile = updateAdditionals(profile, [
          { id: 'lastAccessedUrl', value: { s: '/signup/accountname/add' } }
        ])

        updatedProfile = await updateGeosafeProfile(
          data.authToken,
          updatedProfile
        )

        await registerAllLocations(data.authToken, updatedProfile)

        dispatch(setProfile(updatedProfile))
        navigate('/signup/contactpreferences')
      }
    }
  }

  const registerAllLocations = async (authToken, profile) => {
    profile.pois.map(async (poi, index) => {
      const alertTypes = poi.meta_data.location_additional.alert_types

      const data = {
        authToken,
        locationId: poi.id,
        partnerId: 1, // this is currently a hardcoded value - geosafe to update us on what it is
        params: getRegistrationParams(profile, alertTypes)
      }

      await backendCall(
        data,
        'api/partner/register_location_to_partner',
        navigate
      )
    })
  }

  const updateGeosafeProfile = async (authToken, updatedProfile) => {
    const dataToSend = { authToken, profile: updatedProfile }
    const { data } = await backendCall(
      dataToSend,
      'api/profile/update',
      navigate
    )
    return data.profile
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
        ? (
          <ExpiredCodeLayout getNewCode={getNewCode} />
          )
        : (
          <>
            <BackLink to='/signup' />
            <main className='govuk-main-wrapper govuk-!-padding-top-4'>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-two-thirds'>
                  {codeResent && (
                    <NotificationBanner
                      className='govuk-notification-banner govuk-notification-banner--success'
                      title='Success'
                      text={'New code sent at ' + codeResentTime}
                    />
                  )}
                  {error && <ErrorSummary errorList={[error]} />}
                  <h2 className='govuk-heading-l'>Check your email</h2>
                  <div className='govuk-body'>
                    <p>You need to confirm your email address.</p>
                    <p className='govuk-!-margin-top-6'>
                      We've sent an email with a code to:
                    </p>
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
            </main>
          </>
          )}
    </>
  )
}
