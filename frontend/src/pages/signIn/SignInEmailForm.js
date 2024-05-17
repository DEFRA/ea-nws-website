import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import TextInput from '../../gov-uk-components/TextInput'
import backendCall from '../../services/BackendService'
import emailValidation from '../../services/Validations/EmailValidation'

const SignInEmailForm = (props) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const errors = []
    let signinToken = null
    if (email === '') {
      errors.push('Enter your email address')
    } else if (!emailValidation(email)) {
      errors.push(
        'Enter an email address in the correct format, like name@example.com'
      )
    }
    if (errors.length === 0) {
      const { emailExists, signInToken: token } = await checkEmail(email)
      if (!emailExists) {
        errors.push('Email address is not recognised - check and try again')
      } else {
        signinToken = token
      }
    }

    if (errors.length > 0) {
      props.setErrorList(errors)
      return
    }
    props.setErrorList([])
    navigate('/signin/validate', {
      state: { signinToken, email }
    })
    event.target.reset()
  }

  const checkEmail = async (email) => {
    const raw = JSON.stringify({ email })
    const responseData = await backendCall(raw, 'signInStart')
    if (responseData === undefined) {
      return { emailExists: false, signInToken: null }
    }
    const code = responseData.code
    if (code === 106) {
      return { emailExists: false, signInToken: null }
    }
    const signInToken = responseData.signInToken
    return { emailExists: true, signInToken }
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
