import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'

export default function LocationNotNearDangerPage() {
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <PhaseBanner />
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-body">
              <Link onClick={() => navigate(-1)} className="govuk-back-link">
                Back
              </Link>
              <h1 className="govuk-heading-l govuk-!-margin-top-6">
                You cannot get flood messages for this location
              </h1>

              {/* update to pass in the correct data */}
              <h3 class="govuk-heading-s govuk-!-margin-0">ADDRESS LINE 1</h3>
              <h3 class="govuk-heading-s govuk-!-margin-0">ADDRES LINE 2</h3>
              <h3 class="govuk-heading-s govuk-!-margin-0">TOWN</h3>
              <h3 class="govuk-heading-s govuk-!-margin-0">COUNTY</h3>
              <h3 class="govuk-heading-s govuk-!-margin-0">POSTCODE</h3>
              <p className="govuk-!-margin-top-5">Possible reasons are that:</p>
              <ul class="govuk-list govuk-list--bullet">
                <li>the risk of flooding is very low</li>
                <li>
                  it may flood due to flash flooding but we cannot send warnings
                  for this type of flooding yet
                </li>
                <li>our forecasting does not cover this location</li>
              </ul>
              <p>You may still be at risk of flooding. You can:</p>
              <ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-9">
                <li>
                  <Link
                    class="govuk-link"
                    to="/signup/register-location/search"
                  >
                    try another postcode
                  </Link>
                </li>
                <li>
                  <a
                    class="govuk-link"
                    href="https://www.gov.uk/check-long-term-flood-risk"
                  >
                    check the long term risk for this location
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
