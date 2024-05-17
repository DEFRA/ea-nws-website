import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import TextInput from '../../gov-uk-components/TextInput'
import backendCall from '../../services/BackendService'
import emailValidation from '../../services/Validations/EmailValidation'

const SignInEmailForm = (props) => {
  const navigate = useNavigate()

  const signInNavigate = () => {
    navigate('/SignInValidate', {
      state: {
        email,
        signinToken
      }
    })
  }
  const [email, setEmail] = useState('')
  const [signinToken, setsigninToken] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const errors = []
    if (email === '') {
      errors.push('Enter your email address')
    } else if (!emailValidation(email)) {
      errors.push(
        'Enter an email address in the correct format, like name@example.com'
      )
    }
    if (errors.length === 0) {
      const emailExists = await checkEmail(email)
      if (!emailExists) {
        errors.push('Email address is not recognised - check and try again')
      }
    }

    if (errors.length > 0) {
      props.setErrorList(errors)
      return
    }
    props.setErrorList([])
    setEmail(email)
    signInNavigate()
    event.target.reset()
  }

  const checkEmail = async (email) => {
    let signinToken = ''
    const raw = JSON.stringify({ email })
    const responseData = await backendCall(raw, 'signInStart')
    if (responseData === undefined) {
      return false
    }
    const code = responseData.code
    signinToken = responseData.signInToken
    if (code === 101) {
      return false
    }
    setsigninToken(signinToken)
    return true
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="Email address"
        id="emailAddress"
        errorList={props.errorList}
        onChange={setEmail}
      />
      <Button className="govuk-button" text="Continue"></Button>
    </form>
  )
}

export default SignInEmailForm
