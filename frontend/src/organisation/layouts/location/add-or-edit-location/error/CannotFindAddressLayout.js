import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'

export default function CannotFindAddressLayout ({
  navigateToNextPage,
  navigateToDifferentPostCode,
  navigateToDifferentCoordinates,
  navigateToFindLocationOnMap,
  flow
}) {
  const navigate = useNavigate()

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>If you cannot find the address:</h1>
            <div className='govuk-body'>
              <p>
                This might be because the address is not recognised, for example
                it may be a new address, or it uses a building name instead of a
                street address. Or it may be because the information is
                incorrectly typed or formatted.
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-top-6'>
                What you can do next
              </h3>
              <p>
                You can:
                <ul className='govuk-list govuk-list--bullet'>
                  <li>
                    <Link
                      onClick={(e) => {
                        e.preventDefault()
                        navigateToDifferentPostCode()
                      }}
                      className='govuk-link'
                    >
                      use a different postcode
                    </Link>
                  </li>
                  {navigateToDifferentCoordinates && (
                    <li>
                      <Link
                        onClick={(e) => {
                          e.preventDefault()
                          navigateToDifferentCoordinates()
                        }}
                        className='govuk-link'
                      >
                        use X and Y coordinates
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      onClick={(e) => {
                        e.preventDefault()
                        navigateToFindLocationOnMap()
                      }}
                      className='govuk-link'
                    >
                      find the location on a map
                    </Link>
                  </li>
                </ul>
              </p>

              {flow === 'unmatched-locations-not-found' && (
                <Button
                  className='govuk-button govuk-!-margin-top-4'
                  text='Continue'
                  onClick={() => navigateToNextPage()}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
