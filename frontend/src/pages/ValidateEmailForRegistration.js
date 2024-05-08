import Header from "../gov-uk-components/Header";
import Footer from "../gov-uk-components/Footer";

export default function ValidateEmailForRegistration() {
  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <a href="register" class="govuk-back-link">Back</a>
        <h2 class="govuk-heading-l">Check your email</h2>
        <div class="govuk-body">
          We've sent a code to: email address
          <p>Input code below:</p>
          <input className="govuk-input govuk-!-width-one-half" id="code" name="code" type="code" spellCheck="false" ></input>
        </div>
      </div>
      <Footer />
    </>
  );
}