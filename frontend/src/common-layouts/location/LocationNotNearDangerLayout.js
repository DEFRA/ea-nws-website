import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function LocationNotNearDangerLayout ({ tryAnotherPostCode }) {
  const navigate = useNavigate()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <div className='govuk-body'>
                <Link onClick={() => navigate(-1)} className='govuk-back-link'>
                  Back
                </Link>
                <h1 className='govuk-heading-l govuk-!-margin-top-6'>
                  You cannot get flood messages for this location
                </h1>
                <InsetText text={selectedLocation.name} />
                <p className='govuk-!-margin-top-5'>
                  Possible reasons are that:
                </p>
                <ul className='govuk-list govuk-list--bullet'>
                  <li>the risk of flooding is very low</li>
                  <li>
                    it may flood due to flash flooding but we cannot send
                    warnings for this type of flooding yet
                  </li>
                  <li>our forecasting does not cover this location</li>
                </ul>
                <p>You may still be at risk of flooding. You can:</p>
                <ul className='govuk-list govuk-list--bullet govuk-!-margin-bottom-9'>
                  <li>
                    <Link className='govuk-link' to={tryAnotherPostCode()}>
                      try another postcode
                    </Link>
                  </li>
                  <li>
                    <a
                      className='govuk-link'
                      href='https://www.gov.uk/check-long-term-flood-risk'
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
      </div>
    </>
  )
}
