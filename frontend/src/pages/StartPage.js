import Header from "../gov-uk-components/Header";
import Footer from "../gov-uk-components/Footer";

export default function StartPage() {
  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <h1 class="govuk-heading-xl">Next Warning Service</h1>
        <p class="govuk-body">Use this free service to:</p>
        <ul class="govuk-list govuk-list--bullet">
          <li>
            get flood warnings by text message, email or automated telephone
            message
          </li>
          <li>
            edit or remove contact information you have already registered
          </li>
        </ul>
        <p class="govuk-body">
          This service will tell you when a flood from rivers, the sear or
          groundwater is expected ina flood risk area in England.
        </p>
        <p class="govuk-body">
          You will get updates about changes to the flood situation. This might
          be information about higher water levels, or if an earlier start to
          the flood is expected.
        </p>
        <p class="govuk-body">
          This service does not cover surface water flooding. If you want to
          know if there is surface water flooding (also known as 'flash
          flooding') in your area,{" "}
          <a href="#" class="govuk-link">
            contact your local council
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
}
