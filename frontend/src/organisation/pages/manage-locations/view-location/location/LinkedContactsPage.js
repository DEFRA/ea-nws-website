import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import linkIcon from '../../../../../common/assets/images/link.svg'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Radio from '../../../../../common/components/gov-uk/Radio'
import AlertType from '../../../../../common/enums/AlertType'
import { getLocationAdditionals, setCurrentLocationAlertTypes } from '../../../../../common/redux/userSlice'
import { infoUrls } from '../../../../routes/info/InfoRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import LocationHeader from './location-information-components/LocationHeader'
import { setLinkLocations } from '../../../../../common/redux/userSlice'

export default function LinkedContactsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentLocation = useSelector((state) => state.session.currentLocation)

  const linkToContacts = () => {
    const linkLocations = [currentLocation.id]
    dispatch(setLinkLocations(linkLocations))
    navigate(orgManageContactsUrls.view.dashboard)
  }

  const linkedContactsSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Linked contacts
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
      
      <Button
        text='Link to contacts'
        className='govuk-button govuk-button--secondary'
        onClick={linkToContacts}
      />
    </>
  )

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(orgManageLocationsUrls.view.dashboard)
  }

  return (
    <>

      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-0'>
        <LocationHeader
          currentPage={orgManageLocationsUrls.view.viewLinkedContacts}
        />
        {linkedContactsSection}
      </main>
    </>
  )
}
