import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import Input from '../../../gov-uk-components/Input'
import { emailValidation } from '../../../services/validations/EmailValidation'

export default function AddEmailPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = emailValidation(email)
    setError(validationError)
    const dataToSend = { email }
    if (validationError === '') {
      /*const { errorMessage, data } = await backendCall(
        dataToSend,
        'signInStart',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage.desc)
      } else {

      }*/
      navigate('/managecontact/validate-email')
    }
  }

  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <Link navigate="-1" className="govuk-back-link">
          Back
        </Link>
        <ErrorSummary errorList={error === '' ? [] : [error]} />
        <h2 class="govuk-heading-l">
          Enter an email address to get flood messages
        </h2>
        <div class="govuk-body">
          We recommend using an email address you can access 24 hours a day.
          <Input
            name="Email address"
            inputType="text"
            error={error}
            onChange={(val) => setEmail(val)}
          />
          <Button
            className="govuk-button"
            text="Continue"
            onClick={handleSubmit}
          />
          <br />
        </div>
      </div>
      <Footer />
    </>
  )
}
