import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import Input from '../../../gov-uk-components/Input'
import InsetText from '../../../gov-uk-components/InsetText'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import { setProfile, setRegisterToken } from '../../../redux/userSlice'
import { backendCall } from '../../../services/BackendService'
import { addVerifiedContact } from '../../../services/ProfileServices'
import { emailValidation } from '../../../services/validations/EmailValidation'

export default function SignUpPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const profile = useSelector((state) => state.session.profile)

  const handleSubmit = async () => {
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
        // add email to  emails list
        const updatedProfile = addVerifiedContact(profile, 'email', email)
        dispatch(setProfile(updatedProfile))
        // start empty profile for user
        const profile = {
          id: '',
          enabled: true,
          firstname: '',
          lastname: '',
          // email required validation to continue so can put in verified list
          emails: [email],
          mobilePhones: [],
          homePhones: [],
          language: 'EN', // [TODO] is this always english?
          additionals: [{ id: 'signUpComplete', value: false }],
          unverified: {
            emails: [],
            mobilePhones: [],
            homePhones: []
          },
          pois: []
        }
        dispatch(setProfile(profile))
        dispatch(setRegisterToken(data.registerToken))
        navigate('/signup/validate')
      }
    }
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <Link onClick={() => navigate(-1)} className='govuk-back-link'>
            Back
          </Link>
          {error && <ErrorSummary errorList={[error]} />}
          <h2 className='govuk-heading-l'>
            Enter an email address - you'll use this to sign in to your account
          </h2>
          <div className='govuk-body'>
            <p>
              You'll be able to use your account to update your locations, flood
              messages or contact details.{' '}
            </p>
            <InsetText text='We recommend using an email address you can access 24 hours a day.' />
            <Input
              className='govuk-input govuk-input--width-10'
              inputType='text'
              name='Email address'
              error={error}
              onChange={(val) => setEmail(val)}
            />
            <Button
              className='govuk-button'
              text='Continue'
              onClick={handleSubmit}
            />
            <br />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
