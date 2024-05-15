import Header from "../../gov-uk-components/Header";
import Footer from "../../gov-uk-components/Footer";
import InsetText from "../../gov-uk-components/InsetText";
import ErrorSummary from "../../gov-uk-components/ErrorSummary";
import { useState } from "react";
import CodeForm from "./SignInCodeForm";

const userEmail = window.sessionStorage.getItem("userEmail");

export default function CheckYourEmailPage() {
  const [errorList, setErrorList] = useState([]);
  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <a href="SignInStart" class="govuk-back-link">
          Back
        </a>
        <ErrorSummary errorList={errorList}></ErrorSummary>
        <h2 class="govuk-heading-l">Check your email</h2>
        <div class="govuk-body">
          We've sent a code to:
          <InsetText text={userEmail}></InsetText>
          <CodeForm
            errorList={errorList}
            setErrorList={setErrorList}
          ></CodeForm>
        </div>
      </div>
      <Footer />
    </>
  );
}
