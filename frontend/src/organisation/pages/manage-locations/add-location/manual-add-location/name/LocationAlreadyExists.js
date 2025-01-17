import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import { getLocationAdditional } from '../../../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'
export default function LocationAlreadyExists () {
  const navigate = useNavigate()
  const locationName = useSelector(
    (state) =>
      getLocationAdditional(state, 'locationName')
  )

  return (
    <>

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
                to={orgManageLocationsUrls.add.name}
                className='govuk-link'
              >
                use a different location name for this location
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
