import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import UserType from '../../../../common/enums/UserType'
import store from '../../../../common/redux/store'
import {
  setAddingAdminFlow,
  setLinkContacts
} from '../../../../common/redux/userSlice'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function LinkContactToLocationPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentContact = store.getState().session.orgCurrentContact
  const addingAdminFlow = store.getState().session.addingAdminFlow

  const userType = currentContact?.role || null
  const pendingRole = currentContact?.pendingRole || null

  if (addingAdminFlow) {
    dispatch(setAddingAdminFlow(false))
  }

  const linkToLocations = (event) => {
    event.preventDefault()
    const linkContacts = [currentContact.id]
    dispatch(setLinkContacts(linkContacts))
    navigate(orgManageLocationsUrls.view.dashboard, {
      state: {
        linkContacts,
        linkSource: 'info'
      }
    })
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const successMessage = () => {
    const fullName =
      currentContact?.firstname +
      (currentContact?.lastname && currentContact?.lastname.length > 0
        ? ' ' + currentContact.lastname
        : '')

    // User invited as admin will be pending admin
    if (pendingRole === UserType.PendingAdmin) {
      return [
        `Email invitation sent to ${currentContact.emails[0]}`,
        `${fullName} will be a pending admin until they accept the invitation and confirm their email address. Invitation valid for 72 hours.`
      ]
    }

    // Otherwise, just show what they are now
    const isAdmin = userType === UserType.Admin.toUpperCase()
    return [`${fullName} added as ${isAdmin ? 'an admin' : 'a contact'}`]
  }

  return (
    <>
      <Helmet>
        <title>
          If {currentContact?.firstname} {currentContact?.lastname} needs flood
          messages, you need to link them to locations - Manage users - Get
          flood warnings (professional) - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l' id='main-content'>
              If{' '}
              {currentContact.firstname +
                (currentContact.lastname.length > 0
                  ? ' ' + currentContact.lastname
                  : '')}{' '}
              needs flood messages, you need to link them to locations
            </h1>
            <Button
              className='govuk-button govuk-!-margin-right-2'
              text='Link to locations now'
              onClick={linkToLocations}
            />
            <Link
              to={orgManageContactsUrls.view.dashboard}
              state={{
                successMessage: successMessage()
              }}
              className='govuk-link inline-link govuk-body'
            >
              Skip - do this later
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
