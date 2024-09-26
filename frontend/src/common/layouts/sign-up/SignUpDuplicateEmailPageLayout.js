import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getOrganisationAdditionals } from '../../../common/services/ProfileServices'
import BackLink from '../../components/custom/BackLink'
import Button from '../../components/gov-uk/Button'
import ErrorSummary from '../../components/gov-uk/ErrorSummary'
import InsetText from '../../components/gov-uk/InsetText'
import { backendCall } from '../../services/BackendService'

export default function SignUpDuplicateEmailPageLayout () {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const email = location.state.email
  const profile = useSelector((state) => state.session.profile)

  const isOrganisationPage = location.pathname.includes('organisation')
  const urlSignup = isOrganisationPage
    ? '/organisation/sign-up/admin-details'
    : '/signup'
  const urlSigninValidate = isOrganisationPage
    ? '/organisation/signin/validate'
    : '/signin/validate'

  const organisation = Object.assign({}, getOrganisationAdditionals(profile))

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
      navigate(urlSigninValidate, {
        state: { signinToken: data.signinToken, email }
      })
    }
  }

  return (
    <>
      <BackLink to={urlSignup} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={error === '' ? [] : [error]} />}
            <h1 className='govuk-heading-l'>
              The email address you entered is <br /> already being used
            </h1>
            <InsetText text={email} isTextBold />
            <div className='govuk-body'>
              {organisation.isAdminRegistering
                ? (
                  <>
                    <p>
                      If this is your account, you can sign in by getting a code
                    </p>
                    <br />
                    <Button
                      className='govuk-button'
                      text='Get code to sign in'
                      onClick={handleSubmit}
                    />
                  &nbsp;
                    <Link to={urlSignup} className='govuk-link inline-link'>
                      Go back and enter a different email address
                    </Link>
                  </>
                  )
                : (
                  <>
                    If they already have an account, they can sign in and use the
                    service.
                    <br />
                    <br />
                    <Link to={urlSignup} className='govuk-link'>
                      Go back and enter a different email address
                    </Link>
                  </>
                  )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
