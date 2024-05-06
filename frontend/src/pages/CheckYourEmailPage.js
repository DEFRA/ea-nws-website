import Header from "../gov-uk-components/Header";
import Footer from "../gov-uk-components/Footer";
import InsetText from "../gov-uk-components/InsetText";

export default function CheckYourEmailPage() {
  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <a href="SignInPage" class="govuk-back-link">Back</a>
        <h2 class="govuk-heading-l">Check your email</h2>
        <div class="govuk-body">
          We've sent a code to:
          <InsetText>This is where</InsetText>
        </div>
      </div>
      <Footer />
    </>
  );
}
