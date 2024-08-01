import React from 'react'
import { useLocation } from 'react-router'
import AccountNavigation from '../../../common/components/custom/AccountNavigation'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import SubscribedLocationTableLayout from '../manage-location/SubscribedLocationTable'

export default function HomePage () {
  const location = useLocation()
  return (
    <>
      <AccountNavigation currentPage={useLocation().pathname} />
      {location.state !== null &&
          location.state.removedAddress
        ? (
          <NotificationBanner
            className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-0 govuk-!-margin-top-4'
            title='Success'
            heading='Location removed'
            text={location.state.removedAddress}
          />
          )
        : null}
      <main className='govuk-main-wrapper'>
        <div class='govuk-grid-row'>
          <div class='govuk-grid-column-full'>
            {location.state && location.state.locationName && (
              <NotificationBanner
                className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-5 govuk-!-margin-top-4'
                title='Success'
                heading='New location added'
                text={location.state.locationName}
              />
            )}
            <h1 className='govuk-heading-l'>Home</h1>
            <SubscribedLocationTableLayout />
          </div>
        </div>
      </main>
    </>
  )
}
