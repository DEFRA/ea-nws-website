import Header from "../../gov-uk-components/Header";
import Footer from "../../gov-uk-components/Footer";
import PhaseBanner from "../../gov-uk-components/PhaseBanner";
import InsetText from "../../gov-uk-components/InsetText";
import Button from "../../gov-uk-components/Button";
import NotificationBanner from "../../gov-uk-components/NotificationBanner";
import Details from "../../gov-uk-components/Details";

export default function ConfirmDeleteContactDetailsPage() {
  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <PhaseBanner />
        <a href="#" class="govuk-back-link">
          Back
        </a>
        <main class="govuk-main-wrapper">
          <div class="govuk-grid-row">
            <div class="govuk-grid-column-two-thirds">
              <h2 class="govuk-heading-l">
                Are you sure you want to remove this email address ?
              </h2>
              <InsetText text={"mary.pepper@gmail.com"} />
              <Button
                className={"govuk-button govuk-button--warning"}
                text={"Remove"}
              />
              &nbsp;
              <a href="#" class="govuk-link">
                Cancel
              </a>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
