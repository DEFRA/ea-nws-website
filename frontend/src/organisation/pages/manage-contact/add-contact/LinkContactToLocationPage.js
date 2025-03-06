import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import { setLinkContacts } from '../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'
import store from '../../../../common/redux/store'

export default function LinkContactToLocationPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentContact = store.getState().session.orgCurrentContact

  const linkToLocations = () => {
    const linkContacts = [currentContact.id]
    dispatch(setLinkContacts(linkContacts))
    navigate(orgManageLocationsUrls.view.dashboard, {
      state: {
        linkContacts, linkSource: 'info'
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
              If you want {currentContact.firstname + (currentContact.lastname.length > 0 ? ' ' + currentContact.lastname : '')} to get
              available flood messages you need to link them to locations
            </h1>
            <p className='govuk-body'>
              As an admin you automatically get sent all available flood messages for
              all locations.
            </p>
            <p className='govuk-body'>
              But {currentContact.firstname + (currentContact.lastname.length > 0 ? ' ' + currentContact.lastname : '')} will not be able to get available flood messages for
              any locations until they're linked to the locations you want them to get
              messages for. Any contacts not linked to any locations will not get flood
              messages.
            </p>
            <p className='govuk-body'>
              Contacts do not have access to this account and cannot sign in to it.
            </p>
            <Button
              className='govuk-button'
              text='Link to locations now'
              onClick={linkToLocations}
            />
            &nbsp; &nbsp;
            <Link
              to={orgManageContactsUrls.view.dashboard}
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
