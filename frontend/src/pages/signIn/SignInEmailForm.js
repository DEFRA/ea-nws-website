import TextInput from '../../gov-uk-components/TextInput'

const backendCall = require('../../services/BackendService')

const EmailForm = ({ errorList, setErrorList }) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const email = event.target.emailAddress.value
    const errors = []
    if (email === '') {
      errors.push('Enter your email address')
    } else if (!validateEmail(email)) {
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
      setErrorList(errors)
      return
    }
    setErrorList([])
    window.sessionStorage.setItem('userEmail', email)
    event.target.reset()
    window.location.replace('SignInValidate')
  }

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const checkEmail = async (email) => {
    let signInToken = ''
    const raw = JSON.stringify({ email })
    const responseData = await backendCall(raw, 'signInStart')
    if (responseData === undefined) {
      return false
    }
    const code = responseData.code
    signInToken = responseData.signInToken
    if (code === 101) {
      return false
    }
    window.sessionStorage.setItem('signInToken', signInToken)
    return true
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name='Email address'
        id='emailAddress'
        errorList={errorList}
      />
      <button type='submit' className='govuk-button' data-module='govuk-button'>
        Continue
      </button>
    </form>
  )
}

export default EmailForm
