import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import InsetText from '../../../../common/components/gov-uk/InsetText'
import { backendCall } from '../../../../common/services/BackendService'

export default function SignUpPage () {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const email = location.state.email

  const handleSubmit = async () => {
    const dataToSend = { email }
    const { errorMessage, data } = await backendCall(
      dataToSend,
      'api/sign_in',
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
      <BackLink to='/signin' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
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
        </div>
      </main>
    </>
  )
}
