import { useState } from 'react'
import { useDispatch } from 'react-redux'
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
import NotCompletedSigningUpLayout from '../../common-layouts/sign-up/NotCompletedSignUpLayout'

export default function SignInValidatePage () {
  const location = useLocation()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [signUpNotComplete, setSignUpNotComplete] = useState(false)
  const [lastAccessedUrl, setLastAccessedUrl] = useState('')
  const signinToken = location.state.signinToken

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
        setError(errorMessage)
      } else {
        dispatch(setAuthToken(data.authToken))
        dispatch(setProfile(data.profile))
        dispatch(setRegistrations(data.registrations))

        const isSignUpComplete = data.profile.additionals.filter(c => c.id === 'signUpComplete')[0].value
        const lastAccessedUrl = data.profile.additionals.filter(c => c.id === 'lastAccessedUrl')[0].value
        setLastAccessedUrl(lastAccessedUrl)

        if(!isSignUpComplete && lastAccessedUrl !== ''){
          setSignUpNotComplete(true)
        }
        else{
          navigate('/home')
        }
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
  }

  return (
    <>
    {signUpNotComplete
        ? (<NotCompletedSigningUpLayout nextPage={lastAccessedUrl}  />)
        : (
      <div className='page-container'>
        <Header />
        <div class='govuk-width-container body-container'>
          <Link to='/signin' className='govuk-back-link'>
            Back
          </Link>
          <ErrorSummary errorList={error === '' ? [] : [error]} />
          <h2 class='govuk-heading-l'>Check your email</h2>
          <div class='govuk-body'>
            We've sent a code to:
            <InsetText text={location.state.email} />
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
