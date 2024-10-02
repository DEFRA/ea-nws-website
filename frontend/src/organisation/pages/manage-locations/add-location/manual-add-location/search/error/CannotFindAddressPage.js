import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../../../common/components/custom/OrganisationAccountNavigation'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'
export default function CannotFindAddressPage() {
  const navigate = useNavigate()

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>If you cannot find the address:</h1>
            <div className='govuk-body'>
              <p>
                This might be because the address is not recognised, for example
                it may be a new address, or it uses a building name instead of a
                street address. Or it may be because the information is
                incorrectly typed or formatted.
              </p>
              <h3 className='govuk-heading-s'>What you can do next</h3>
              <p>
                You can:
                <ul className='govuk-list govuk-list--bullet'>
                  <li>
                    <Link
                      to={orgManageLocationsUrls.search.postCodeSearch}
                      className='govuk-link'
                    >
                      use a different postcode
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/organisation/manage-locations/add' // TODO -update when search map is added
                      className='govuk-link'
                    >
                      find the location on a map
                    </Link>
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
