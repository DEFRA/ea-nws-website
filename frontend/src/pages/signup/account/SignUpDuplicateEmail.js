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
    const dataToSend = { email }
    const { errorMessage, data } = await backendCall(
      dataToSend,
      'api/signInStart',
      navigate
    )

    if (errorMessage !== null) {
      setError(errorMessage)
    } else {
      navigate('/signin/validate', {
        state: { signinToken: data.signinToken, email }
      })
    }
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <Link to='/signin' className='govuk-back-link'>
            Back
          </Link>
          {error && <ErrorSummary errorList={error === '' ? [] : [error]} />}
          <h2 className='govuk-heading-l'>
            The email address you entered is <br /> already being used
          </h2>
          <InsetText text={email} />
          <div className='govuk-body'>
            <p>If this is your account, you can sign in by getting a code</p>
            <br />
            <Button
              className='govuk-button'
              text='Get code to sign in'
              onClick={handleSubmit}
            />
            &nbsp; &nbsp;
            <Link
              to='/signup'
              style={{ display: 'inline-block', padding: '8px 10px 7px' }}
              className='govuk-link'
            >
              Go back and enter a different email address
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
