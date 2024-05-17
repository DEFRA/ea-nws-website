import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import TextInput from '../../gov-uk-components/TextInput'
import {
  setAuthToken,
  setProfile,
  setRegistration
} from '../../redux/userSlice'
import backendCall from '../../services/BackendService'
import codeValidation from '../../services/Validations/CodeValidation'

const SignInCodeForm = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signinToken = props.signinToken

  const [code, setCode] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const errors = []
    if (code === '') {
      errors.push('Enter code')
    } else if (!codeValidation(code, 6)) {
      errors.push('Code must be 6 numbers')
    }
    if (errors.length === 0) {
      const backendResponse = await validateCode(code)
      if (!backendResponse) {
        errors.push('Invalid code')
      }
    }
    if (errors.length > 0) {
      props.setErrorList(errors)
      return
    }
    props.setErrorList()
    event.target.reset()
    navigate('/')
  }

  const validateCode = async (code) => {
    const raw = JSON.stringify({ signinToken, code })
    const responseData = await backendCall(raw, 'signInValidate')

    if (
      responseData === undefined ||
      Object.prototype.hasOwnProperty.call(responseData, 'code')
    ) {
      return false
    }
    dispatch(setAuthToken(responseData.authToken))
    dispatch(setProfile(responseData.profile))
    dispatch(setRegistration(responseData.registration))

    return true
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name='Enter code'
        errorList={props.errorList}
        onChange={setCode}
      />
      <Button className='govuk-button' text='Continue' />
    </form>
  )
}

export default SignInCodeForm
