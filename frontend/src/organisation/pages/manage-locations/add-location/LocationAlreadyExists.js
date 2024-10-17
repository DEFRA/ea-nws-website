import React from 'react'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function LocationAlreadyExists () {
  const navigate = useNavigate()
  const locationName = useSelector(
    (state) =>
      state.session.currentLocation.meta_data.location_additional.location_name
  )

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half' />
          <h1 className='govuk-heading-l'> {locationName} already exists in this account</h1>
          <h2 className='govuk-heading-m'>What do you want to do next?</h2>
          <p className='govuk-body'> You can:</p>
          <ul className='govuk-list govuk-list--bullet'>
            <li>
              <Link
                to='/organisation/manage-locations/add/name'
                className='govuk-link'
              >
                use a differnt location name for this location
              </Link>
            </li>
            <li>
              <Link
                to='/' // update link when location information page is made
                className='govuk-link'
              >
                edit the existing location in this account
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  )
}
