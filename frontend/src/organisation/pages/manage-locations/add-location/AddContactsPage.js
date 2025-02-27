import React from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import { geoSafeToWebLocation } from '../../../../common/services/formatters/LocationFormatter'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddContactsPage () {
  const navigate = useNavigate()

  const currentLocation = geoSafeToWebLocation(useSelector((state) => state.session.currentLocation))

  const addContacts = () => {
    navigate(orgManageContactsUrls.view.dashboard)
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>
              If you want other people to get flood
              messages for {currentLocation.additionals.locationName} you need
              to add them as contacts
            </h1>
            <p className='govuk-body'>
              As an admin you automatically get sent all available flood messages for
              the predefined boundary just added.
            </p>
            <p className='govuk-body'>
              If you want other people to get flood messages for this location
              you need to add them individually to this account as contacts.
            </p>
            <p className='govuk-body'>
              Contacts do not have access to this account and cannot sign in to it.
            </p>
            <p className='govuk-body'>
              Once contacts have been added you then need to link them to this
              location. Any contacts not linked to this location will not get available
              flood messages for it.
            </p>
            <Button
              className='govuk-button'
              text='Add contacts now'
              onClick={addContacts}
            />
            &nbsp; &nbsp;
            <Link
              to={orgManageLocationsUrls.monitoring.view}
              className='govuk-link inline-link'
            >
              I'll do this later
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
