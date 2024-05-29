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
  setRegistration
} from '../../redux/userSlice'
import backendCall from '../../services/BackendService'
import codeValidation from '../../services/Validations/AuthCodeValidation'

export default function SignInValidatePage () {
  const location = useLocation()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const signinToken = location.state.signinToken

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = codeValidation(code, 6)
    setError(validationError)
    if (validationError !== '') return
    const backendResponse = await backendCallResponse(code)
    if (!backendResponse) {
      setError('Invalid code')
      return
    }
    navigate('/')
  }

  const backendCallResponse = async (code) => {
    const data = {
      signinToken,
      code
    }
    const responseData = await backendCall(data, 'signInValidate')
    if (responseData === undefined || responseData.data.code === 101) {
      return false
    }

    dispatch(setAuthToken(responseData.data.authToken))
    dispatch(setProfile(responseData.data.profile))
    dispatch(setRegistration(responseData.data.registration))

    return true
  }

  return (
    <>
      <Header />
      <div class='govuk-width-container'>
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
        </div>
      </div>
      <Footer />
    </>
  )
}
