import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import InsetText from '../../../gov-uk-components/InsetText'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import { backendCall } from '../../../services/BackendService'

export default function SignUpPage () {
  
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const email = location.state.email

  const handleSubmit = async () => {

    const data = { email }
    const { errorMessage } = await backendCall(
      data,
      'api/signupStart',
      navigate('/signup/validate', {
        state: { email }})
    )
    if (errorMessage !== null) {
      setError(errorMessage.desc)
    }
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <Link to='/signup' className='govuk-back-link'>
          Back
        </Link>
        {error && <ErrorSummary errorList={error === '' ? [] : [error]} />}
        <h2 className='govuk-heading-l'>
          Your code has expired
        </h2>
          <Button
            className='govuk-button'
            text='Get new code'
            onClick={handleSubmit}
          />
          &nbsp; &nbsp;
        </div>
      <Footer />
    </>
  )
}
