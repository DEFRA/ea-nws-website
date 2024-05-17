import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import SignInCodeForm from './SignInCodeForm'

export default function SignInValidatePage() {
  const location = useLocation()
  const [errorList, setErrorList] = useState([])
  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <a href="SignInStart" class="govuk-back-link">
          Back
        </a>
        <ErrorSummary errorList={errorList} />
        <h2 class="govuk-heading-l">Check your email</h2>
        <div class="govuk-body">
          We've sent a code to:
          <InsetText text={location.state.email} />
          <SignInCodeForm
            errorList={errorList}
            setErrorList={setErrorList}
            signinToken={location.state.signinToken}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
