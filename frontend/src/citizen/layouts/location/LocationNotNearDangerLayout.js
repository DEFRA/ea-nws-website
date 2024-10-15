import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import InsetText from '../../../common/components/gov-uk/InsetText'

export default function LocationNotNearDangerLayout({
  continueToSearchResultsPage
}) {
  const navigate = useNavigate()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>
                You cannot get flood messages for this location
              </h1>
              <InsetText text={selectedLocation.address} />
              <p className='govuk-!-margin-top-5'>Possible reasons are that:</p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>the risk of flooding is very low</li>
                <li>
                  it may flood due to flash flooding but we cannot send warnings
                  for this type of flooding yet
                </li>
                <li>our forecasting does not cover this location</li>
              </ul>
              <p>You may still be at risk of flooding. You can:</p>
              <ul className='govuk-list govuk-list--bullet govuk-!-margin-bottom-9'>
                <li>
                  <Link
                    className='govuk-link'
                    onClick={(e) => {
                      e.preventDefault()
                      continueToSearchResultsPage()
                    }}
                  >
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
      </main>
    </>
  )
}
