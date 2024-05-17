import { useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import SignInEmailForm from './SignInEmailForm'

export default function SignInPage () {
  const [errorList, setErrorList] = useState([])
  return (
    <>
      <Header />
      <div class='govuk-width-container'>
        <Link to='/' className='govuk-back-link'>
          Back
        </Link>
        <ErrorSummary errorList={errorList} />
        <h2 class='govuk-heading-l'>Sign in to your flood warnings account</h2>
        <div class='govuk-body'>
          You can:
          <ul class='govuk-list govuk-list--bullet'>
            <li>update or remove your locations</li>
            <li>change how you get flood messages</li>
            <li>delete your account</li>
          </ul>
          <SignInEmailForm errorList={errorList} setErrorList={setErrorList} />
          <Link to='/' className='govuk-link'>
            Sign up if you do not have an account
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
