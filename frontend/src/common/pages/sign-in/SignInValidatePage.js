import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotCompletedSignUpLayout from '../../../citizen/layouts/sign-up/NotCompletedSignUpLayout'
import { orgManageLocationsUrls } from '../../../organisation/routes/manage-locations/ManageLocationsRoutes'
import BackLink from '../../components/custom/BackLink'
import LoadingSpinner from '../../components/custom/LoadingSpinner'
import Button from '../../components/gov-uk/Button'
import ErrorSummary from '../../components/gov-uk/ErrorSummary'
import Input from '../../components/gov-uk/Input'
import InsetText from '../../components/gov-uk/InsetText'
import NotificationBanner from '../../components/gov-uk/NotificationBanner'
import ExpiredCodeLayout from '../../layouts/email/ExpiredCodeLayout'
import {
  setAuthToken,
  setContactPreferences,
  setLocationRegistrations,
  setOrganization,
  setProfile,
  setProfileId,
  setRegistrations,
  setSigninType
} from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import { getAdditionals } from '../../services/ProfileServices'
import { authCodeValidation } from '../../services/validations/AuthCodeValidation'

export default function SignInValidatePage() {
  const location = useLocation()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [signinToken, setSignInToken] = useState(location.state.signinToken)
  const [codeResent, setCodeResent] = useState(false)
  const [codeResentTime, setCodeResentTime] = useState(new Date())
  const [codeExpired, setCodeExpired] = useState(false)
  const [signUpNotComplete, setSignUpNotComplete] = useState(false)
  const [lastAccessedUrl, setLastAccessedUrl] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['authToken'])
  const [orgData, setOrgData] = useState(null)
  const [stage, setStage] = useState('Retrieving locations')
  const enterCodeId = 'enter-code'

  useEffect(() => {
    if (orgData) {
      const startProcessing = async () => {
        const dataToSend = { orgData }
        await backendCall(dataToSend, 'api/org_signin', navigate)
      }
      startProcessing()
      const interval = setInterval(async function getStatus() {
        if (getStatus.isRunning) return
        getStatus.isRunning = true
        const dataToSend = { authToken: orgData.authToken }
        const { data, errorMessage } = await backendCall(
          dataToSend,
          'api/org_signin_status',
          navigate
        )
        if (data) {
          if (data?.stage !== stage) {
            setStage(data.stage)
          }
          if (data?.status === 'complete') {
            navigate(orgManageLocationsUrls.monitoring.view)
          }
        }
        if (errorMessage) {
          setError(errorMessage)
        }
        getStatus.isRunning = false
      }, 2000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [orgData])

  // if error remove code sent notification
  useEffect(() => {
    setCodeResent(false)
  }, [error])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { error: validationError, code: formattedCode } =
      authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const dataToSend = { signinToken, code: formattedCode }
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/sign_in_validate'
      )

      if (errorMessage !== null) {
        if (errorMessage === 'account pending') {
          navigate('/sign-in/organisation/account-pending')
        } else if (
          errorMessage ===
          'The code you have entered has expired - please request a new code'
        ) {
          setCodeExpired(true)
        } else {
          setError(errorMessage)
        }
      } else {
        setCookie('authToken', data.authToken)
        dispatch(setAuthToken(data.authToken))
        dispatch(setProfile(data.profile))
        if (data.organization) {
          dispatch(setProfileId(data.profile.id))
          dispatch(setOrganization(data.organization))
          dispatch(setSigninType('org'))
        }
        dispatch(setRegistrations(data.registrations))
        dispatch(
          setContactPreferences([
            data.profile.emails.length !== 0 && 'Email Address',
            data.profile.homePhones.length !== 0 && 'PhoneCall',
            data.profile.mobilePhones.length !== 0 && 'Text'
          ])
        )

        const isSignUpComplete = getAdditionals(data.profile, 'signupComplete')
        const lastAccessedUrl = getAdditionals(data.profile, 'lastAccessedUrl')
        setLastAccessedUrl(lastAccessedUrl)

        if (isSignUpComplete !== 'true' && lastAccessedUrl !== undefined) {
          setSignUpNotComplete(true)
        } else {
          if (data.organization) {
            setOrgData(data)
          } else {
            const { errorMessage, data: verifyData } = await backendCall(
              { authToken: data.authToken },
              'api/sign_in_verify'
            )

            if (!errorMessage) {
              dispatch(
                setLocationRegistrations(verifyData.locationRegistrations)
              )
              dispatch(setProfile(verifyData.profile))
            }

            navigate('/home')
          }
        }
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const dataToSend = { email: location.state.email }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/sign_in',
      navigate
    )

    if (errorMessage !== null) {
      setError(errorMessage)
    }

    setSignInToken(data.signinToken)
    setCodeResent(true)
    setCodeResentTime(new Date().toLocaleTimeString())
    setCodeExpired(false)
  }

  const navigateBack = async (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>Confirm email address - Get flood warnings - GOV.UK</title>
      </Helmet>
      {codeExpired || signUpNotComplete ? (
        (codeExpired && <ExpiredCodeLayout getNewCode={getNewCode} />) ||
        (signUpNotComplete && (
          <NotCompletedSignUpLayout nextPage={lastAccessedUrl} />
        ))
      ) : (
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
                {error && (
                  <ErrorSummary
                    errorList={[{ text: error, componentId: enterCodeId }]}
                  />
                )}
                <h2 className='govuk-heading-l' id='main-content'>
                  Confirm email address{' '}
                </h2>
                <div className='govuk-body'>
                  We've sent an email with a code to:
                  <InsetText text={location.state.email} />
                  <Input
                    id={enterCodeId}
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
                  &nbsp; &nbsp;
                  <Link
                    onClick={navigateBack}
                    className='govuk-link inline-link'
                  >
                    Enter a different email
                  </Link>
                  <br />
                  <Link onClick={getNewCode} className='govuk-link'>
                    Get a new code
                  </Link>
                </div>
              </div>
            </div>
          </main>
          {orgData && error === '' && (
            <div className='popup-dialog'>
              <div className='popup-dialog-container govuk-!-padding-bottom-6'>
                <LoadingSpinner
                  loadingText={<p className='govuk-body-l'>{`${stage}...`}</p>}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
