import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import { setLinkLocations } from '../../../../common/redux/userSlice'
import { geoSafeToWebLocation } from '../../../../common/services/formatters/LocationFormatter'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function LinkLocationToContactPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentLocation = geoSafeToWebLocation(useSelector((state) => state.session.currentLocation))

  const linkToContacts = (event) => {
    event.preventDefault()
    const linkLocations = [currentLocation.id]
    dispatch(setLinkLocations(linkLocations))
    navigate(orgManageContactsUrls.view.dashboard, {
      state: {
        linkLocations, linkSource: 'info'
      }
    })
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
              If people in your organisation need
              flood messages for this location
            </h1>
            <p className='govuk-body'>
              You'll need to add these people as contacts.
            </p>
            <p className='govuk-body'>
              Then link this location to these contacts.
            </p>
            <div className='govuk-!-margin-top-6'>
              <Button
                className='govuk-button'
                text='Link location to contacts now'
                onClick={linkToContacts}
              />
              &nbsp; &nbsp;
              <Link
                to={orgManageLocationsUrls.view.dashboard}
                className='govuk-link inline-link'
              >
                I'll do this later
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
