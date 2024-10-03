import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'
export default function NotInEnglandLayout ({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const location = useLocation()
  const isLocationAdding = !!location.pathname.includes('add')
  const handleSubmit = () => {
    NavigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              This location is not in England and cannot be added to this
              account
            </h1>
            <div className='govuk-body'>
              <p>
                To get flood messages for location in Scotland or Wales go to:
              </p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>
                  <a
                    href='https://floodline.sepa.org.uk/floodingsignup/'
                    className='govuk-link'
                  >
                    The Scottish Environment Protection Agency (SEPA)
                  </a>{' '}
                  for flood messages in Scotland
                </li>
                <li>
                  <a
                    href='https://naturalresources.wales/splash?orig=%2fflooding%2fsign-up-to-receive-flood-warnings%2f&lang=cy'
                    className='govuk-link'
                  >
                    flood warnings in Wales.
                  </a>{' '}
                  for flood messages in Wales
                </li>
              </ul>
              <p>
                Use flood maps to{' '}
                <a
                  href='https://www.nidirect.gov.uk/articles/check-risk-flooding-your-area'
                  className='govuk-link'
                >
                  check flooding risk in Northern Ireland
                </a>
                .
              </p>
              <h2>
                If you think this is not correct and the locations is in England
              </h2>
              <p>You can</p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>
                  {isLocationAdding
                    ? (
                      <Link
                    // TODO: need to remove these hardcoded URLs
                        to={orgManageLocationsUrls.search.postCodeSearch}
                        className='govuk-link inline-link'
                      >
                        use a different postcode
                      </Link>)
                    : (
                      <Link
                    // TODO: need to remove these hardcoded URLs
                        to={orgManageLocationsUrls.edit.xyCoordinatesSearch}
                        className='govuk-link inline-link'
                      >
                        use a different postcode
                      </Link>
                      )}
                </li>
                <li>
                  <Link
                    // TODO: need to remove these hardcoded URLs
                    to={orgManageLocationsUrls.search.xyCoordinatesSearch}
                    className='govuk-link inline-link'
                  >
                    use a different set of X and Y coordinates
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      orgManageLocationsUrls.unmatchedLocations.manuallyfind.map
                    }
                    className='govuk-link inline-link'
                  >
                    find the location on a map
                  </Link>
                </li>
              </ul>
            </div>
            <Button
              className='govuk-button'
              text='Continue'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
