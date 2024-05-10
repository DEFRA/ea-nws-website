import Header from "../../gov-uk-components/Header";
import Footer from "../../gov-uk-components/Footer";
import PhaseBanner from "../../gov-uk-components/PhaseBanner";
import InsetText from "../../gov-uk-components/InsetText";
import Button from "../../gov-uk-components/Button";
import NotificationBanner from "../../gov-uk-components/NotificationBanner";
import Details from "../../gov-uk-components/Details";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";

export default function ConfirmDeleteContactDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const removeContact = () => {
    console.log("removed");
    navigate("/managecontacts", {
      state: {
        removedType: location.state.type,
        removedContact: location.state.contact,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <PhaseBanner />
        <Link to="/managecontacts" className="govuk-back-link">
          Back
        </Link>
        <main className="govuk-main-wrapper">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h2 className="govuk-heading-l">
                Are you sure you want to remove this {location.state.type}?
              </h2>
              <InsetText text={location.state.contact} />
              <Button
                className={"govuk-button govuk-button--warning"}
                text={"Remove"}
                onClick={removeContact}
              />
              &nbsp;
              <Link to="/managecontacts" className="govuk-link">
                Cancel
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
