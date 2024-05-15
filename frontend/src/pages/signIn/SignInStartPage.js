import Header from "../../gov-uk-components/Header";
import Footer from "../../gov-uk-components/Footer";
import ErrorSummary from "../../gov-uk-components/ErrorSummary";
import { useState } from "react";
import EmailForm from "./SignInEmailForm";

export default function SignInPage() {
  const [errorList, setErrorList] = useState([]);
  console.log(errorList);
  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <a href="Start" class="govuk-back-link">
          Back
        </a>
        <ErrorSummary errorList={errorList}></ErrorSummary>
        <h2 class="govuk-heading-l">Sign in to your flood warnings account</h2>
        <div class="govuk-body">
          You can:
          <ul class="govuk-list govuk-list--bullet">
            <li>update or remove your locations</li>
            <li>change how you get flood messages</li>
            <li>delete your account</li>
          </ul>
          <EmailForm
            errorList={errorList}
            setErrorList={setErrorList}
          ></EmailForm>
          <a href="Start" class="govuk-link">
            Sign up if you do not have an account
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
