import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import InsetText from '../../../common/components/gov-uk/InsetText'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import {
  setAuthToken,
  setOrgId,
  setOrganizationId,
  setProfile,
  setProfileId,
  setRegisterToken
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { updateAdditionals } from '../../../common/services/ProfileServices'
import { authCodeValidation } from '../../../common/services/validations/AuthCodeValidation'
import ExpiredCodeLayout from '../../layouts/expired-code/ExpiredCodeLayout'

export default function ValidateEmailLayout ({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const registerToken = useSelector((state) => state.session.registerToken)
  const loginEmail = useSelector((state) => state.session.profile.emails[0])
  const organization = useSelector((state) => state.session.organization)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [codeResent, setCodeResent] = useState(false)
  const [codeResentTime, setCodeResentTime] = useState(new Date())
  const [codeExpired, setCodeExpired] = useState(false)
  const profile = useSelector((state) => state.session.profile)
  const signinType = useSelector((state) => state.session.signinType)

  // if error remove code sent notification
  useEffect(() => {
    setCodeResent(false)
  }, [error])

  const handleSubmit = async () => {
    const validationError = authCodeValidation(code)
    setError(validationError)

    if (validationError === '') {
      const dataToSend = {
        orgRegisterToken: registerToken,
        code
      }

      const { data, errorMessage } = await backendCall(
        dataToSend,
        'api/org/sign_up_validate',
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
        dispatch(setOrgId(data.organization.id))
        dispatch(setOrganizationId(data.organization.id))
        const updatedProfile = updateAdditionals(profile, [
          { id: 'signupComplete', value: { s: 'false' } },
          { id: 'lastAccessedUrl', value: { s: '/organisation/sign-up/alternative-contact' } }
        ])
        dispatch(setProfile(updatedProfile))
        const profileDataToSend = {
          profile: updatedProfile,
          authToken: data.authToken,
          signinType
        }
        const { data: updateData, errorMessage: updateErrorMessage } = await backendCall(profileDataToSend, 'api/profile/update', navigate)
        if (updateData) {
          dispatch(setProfileId(updateData.profile.id))
        } else if (updateErrorMessage) {
          setError(updateErrorMessage)
        }
        NavigateToNextPage()
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const dataToSend = { name: organization.name, email: loginEmail }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/org/sign_up_start',
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

  const navigateBack = async (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      {codeExpired
        ? (
          <ExpiredCodeLayout getNewCode={getNewCode} />
          )
        : (
          <>
            <BackLink onClick={navigateBack} />
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
                  <h2 className='govuk-heading-l'>Confirm email address</h2>
                  <div className='govuk-body'>
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
                      onClick={navigateBack}
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
