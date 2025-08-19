import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { orgManageLocationsUrls } from '../../../organisation/routes/manage-locations/ManageLocationsRoutes'
import BackLink from '../../components/custom/BackLink'
import Button from '../../components/gov-uk/Button'
import ErrorSummary from '../../components/gov-uk/ErrorSummary'
import Input from '../../components/gov-uk/Input'
import { backendCall } from '../../services/BackendService'
import { emailValidation } from '../../services/validations/EmailValidation'

export default function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const authToken = useSelector((state) => state.session?.authToken)
  const location = useLocation()
  const emailAddressId = 'email-address'

  useEffect(() => {
    const verifyAuth = async () => {
      if (!authToken) return
      try {
        const { errorMessage, data } = await backendCall(
          { authToken },
          'api/sign_in_verify'
        )
        if (data?.organization) {
          navigate(orgManageLocationsUrls.monitoring.view)
        } else if (!errorMessage) {
          navigate('/home')
        }
      } catch (error) {
        navigate('/sign-in')
      }
    }
    verifyAuth()
  }, [authToken])

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
        if (
          errorMessage ===
            'Email address not recognised - check and try again' &&
          location.pathname.includes('organisation')
        ) {
          navigate('/sign-in/organisation/account-pending')
        }
      } else {
        navigate('/sign-in/validate/', {
          state: { signinToken: data.signinToken, email }
        })
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign in - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && (
              <ErrorSummary
                errorList={[{ text: error, componentId: emailAddressId }]}
              />
            )}
            <h1 className='govuk-heading-l' id='main-content'>
              Sign in to your flood warnings account
            </h1>
            <div className='govuk-body'>
              <Input
                id={emailAddressId}
                className='govuk-input govuk-input--width-30'
                name='Email address'
                inputType='text'
                inputMode='email'
                error={error}
                onChange={(val) => setEmail(val.replaceAll(' ', ''))}
              />
              <Button
                className='govuk-button'
                text='Continue'
                onClick={handleSubmit}
              />
              <br />
              <Link to='/signup/service-selection' className='govuk-link'>
                Sign up if you do not have an account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
