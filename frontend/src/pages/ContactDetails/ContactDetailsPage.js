import Header from "../../gov-uk-components/Header";
import Footer from "../../gov-uk-components/Footer";
import PhaseBanner from "../../gov-uk-components/PhaseBanner";
import InsetText from "../../gov-uk-components/InsetText";
import Button from "../../gov-uk-components/Button";
import NotificationBanner from "../../gov-uk-components/NotificationBanner";
import Details from "../../gov-uk-components/Details";

export default function ContactDetailsPage() {
  const emailAddresses = ["matthew.pepper@gmail.com"];
  const telephones = ["07343 454590", "07889 668367"];
  const phone = ["01475 721535"];

  const detailsMessage = (
    <div>
      You must keep at least one contact on your account.&nbsp;
      <a href="#" class="govuk-link">
        Add a new contact
      </a>
      &nbsp; before removing any you do not need. Or you could&nbsp;
      <a href="#" class="govuk-link">
        Delete your account
      </a>
      &nbsp; instead.
    </div>
  );

  return (
    <>
      <Header />

      <div class="govuk-width-container">
        <PhaseBanner />
        <NotificationBanner
          title={"Email address removed"}
          className={
            "govuk-notification-banner govuk-notification-banner--success"
          }
          text={"matthew.pepper@gmail.com"}
        />
        <a href="#" class="govuk-link">
          Back to Home
        </a>
        <main class="govuk-main-wrapper">
          <div class="govuk-grid-row">
            <div class="govuk-grid-column-two-thirds">
              <h2 class="govuk-heading-l">
                Your email addresses and telephone numbers
              </h2>
              <p class="govuk-body">
                We'll send flood messages for all your location to all these
                emails and numbers. You can add more for friends and family, if
                you wish.
              </p>
              <InsetText
                text={
                  "You must confirm each address and number before we can send flood messages to them."
                }
              />
              <h3 class="govuk-heading-m">Emails</h3>
              <table class="govuk-table">
                <tbody class="govuk-table__body">
                  {emailAddresses.map((email, index) => (
                    <tr class="govuk-table__row">
                      <td class="govuk-table__cell">{email}</td>
                      <td class="govuk-table__cell">
                        {emailAddresses.length > 1 ? (
                          <a href="#" class="govuk-link">
                            Remove
                          </a>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {emailAddresses.length === 1 ? (
                <Details
                  title={"If you want to remove this contact"}
                  text={detailsMessage}
                />
              ) : null}
              <Button
                className={"govuk-button govuk-button--secondary"}
                text={"Add an email address"}
              />
              <h3 class="govuk-heading-m">Texts</h3>
              <table class="govuk-table">
                <tbody class="govuk-table__body">
                  {telephones.map((number, index) => (
                    <tr class="govuk-table__row">
                      <td class="govuk-table__cell">{number}</td>
                      <td class="govuk-table__cell">
                        <a href="#" class="govuk-link">
                          Remove
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                className={"govuk-button govuk-button--secondary"}
                text={"Add a mobile number"}
              />
              <h3 class="govuk-heading-m">Phone call warnings</h3>
              <table class="govuk-table">
                <tbody class="govuk-table__body">
                  {phone.map((n, index) => (
                    <tr class="govuk-table__row">
                      <td class="govuk-table__cell">{n}</td>
                      <td class="govuk-table__cell">
                        <a href="#" class="govuk-link">
                          Remove
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                className={"govuk-button govuk-button--secondary"}
                text={"Add a mobile number"}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
