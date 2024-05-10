import React, { useState, useEffect, useCallback } from "react";
import Header from "../../gov-uk-components/Header";
import Footer from "../../gov-uk-components/Footer";
import PhaseBanner from "../../gov-uk-components/PhaseBanner";
import InsetText from "../../gov-uk-components/InsetText";
import NotificationBanner from "../../gov-uk-components/NotificationBanner";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../custom-components/LoadingSpinner";
import ContactDetailsTable from "./ContactDetailsTable";

export default function ContactDetailsPage() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("/contactdetails");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        {loading ? (
          <LoadingSpinner text={"loading..."} />
        ) : (
          <>
            <PhaseBanner />
            {location.state !== null ? (
              <NotificationBanner
                className={
                  "govuk-notification-banner govuk-notification-banner--success"
                }
                title="Success"
                heading={location.state.removedType + " removed"}
                text={location.state.removedContact}
              />
            ) : null}
            <a href="#" className="govuk-link">
              Back to Home
            </a>
            <main className="govuk-main-wrapper">
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds">
                  <h2 className="govuk-heading-l">
                    Your email addresses and telephone numbers
                  </h2>
                  <p className="govuk-body">
                    We'll send flood messages for all your location to all these
                    emails and numbers. You can add more for friends and family,
                    if you wish.
                  </p>
                  <InsetText
                    text={
                      "You must confirm each address and number before we can send flood messages to them."
                    }
                  />
                  <ContactDetailsTable
                    contacts={data.emailaddresses}
                    contactTitle={"Emails"}
                    contactType={"email address"}
                    notRemovable={
                      data.emailaddresses.length === 1 &&
                      data.texts.length === 0 &&
                      data.phones.length === 0
                    }
                  />
                  <ContactDetailsTable
                    contacts={data.texts}
                    contactTitle={"Texts"}
                    contactType={"mobile telephone number"}
                    notRemovable={
                      data.emailaddresses.length === 0 &&
                      data.texts.length === 1 &&
                      data.phones.length === 0
                    }
                  />
                  <ContactDetailsTable
                    contacts={data.phones}
                    contactTitle={"Phone call warnings"}
                    contactType={"telephone number"}
                    notRemovable={
                      data.emailaddresses.length === 0 &&
                      data.texts.length === 0 &&
                      data.phones.length === 1
                    }
                  />
                </div>
              </div>
            </main>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
