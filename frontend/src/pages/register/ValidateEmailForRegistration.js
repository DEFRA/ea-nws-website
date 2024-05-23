import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import ValidateEmailForRegistrationForm from './emailValidation'

const userEmail = window.sessionStorage.getItem('userEmail')

export default function ValidateEmailForRegistration() {
  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <a href="register" className="govuk-back-link">
          Back
        </a>
        <h2 className="govuk-heading-l">Check your email</h2>
        <div className="govuk-body">
          We've sent a code to:
          <InsetText text={userEmail}></InsetText>
          <ValidateEmailForRegistrationForm></ValidateEmailForRegistrationForm>
        </div>
      </div>

      <Footer />
    </>
  )
}
