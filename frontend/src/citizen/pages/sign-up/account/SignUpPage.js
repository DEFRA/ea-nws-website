import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../common/components/gov-uk/Input'
import InsetText from '../../../../common/components/gov-uk/InsetText'
import UserContactType from '../../../../common/enums/UserContactType'
import {
    setProfile,
    setRegisterToken
} from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import {
    addVerifiedContact,
    removeVerifiedContact
} from '../../../../common/services/ProfileServices'
import { emailValidation } from '../../../../common/services/validations/EmailValidation'

export default function SignUpPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const profile = useSelector((state) => state.session.profile)

  useEffect(() => {
    if (profile?.pois?.length === 0) {
      navigate('/signup/service-selection')
    }
  }, [profile])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = emailValidation(email)
    setError(validationError)
    if (validationError === '') {
      const dataToSend = { email }
      const { data, errorMessage } = await backendCall(
        dataToSend,
        'api/sign_up_start',
        navigate
      )

      if (errorMessage !== null) {
        if (errorMessage === 'email already registered') {
          navigate('/signup/duplicate', {
            state: { email }
          })
        } else {
          setError(errorMessage)
        }
      } else {
        let updatedProfile = profile
        if (profile.emails[0]) {
          updatedProfile = removeVerifiedContact(
            updatedProfile,
            profile.emails[0],
            UserContactType.Email
          )
        }
        updatedProfile = addVerifiedContact(updatedProfile, 'email', email)
        dispatch(setProfile(updatedProfile))
        dispatch(setRegisterToken(data.registerToken))
        navigate('/signup/validate')
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Enter an email address - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>Enter an email address</h1>
            <div className='govuk-body'>
              <p>We'll send flood messages to this address. </p>
              <p>
                You'll also use this to signin to your account to update your
                locations, flood messages or contact details.{' '}
              </p>
              <InsetText text='We recommend using an email address you can access 24 hours a day.' />
              <Input
                id='email-address'
                className='govuk-input govuk-input--width-20'
                inputType='text'
                inputMode='email'
                name='Email address'
                error={error}
                onChange={(val) => setEmail(val)}
              />
              <Button
                className='govuk-button'
                text='Continue'
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
