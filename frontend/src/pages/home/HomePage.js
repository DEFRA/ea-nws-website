import React from 'react'
import { useLocation } from 'react-router'
import SubscribedLocationTableLayout from '../manage-location/SubscribedLocationTable'
import AccountNavigation from '../../custom-components/AccountNavigation'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import NotificationBanner from '../../gov-uk-components/NotificationBanner'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function HomePage() {
  const location = useLocation()
  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          {location.state !== null &&
          !location.state.removedAddressFail &&
          location.state.removedAddress ? (
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success'
              title='Success'
              heading='Location removed'
              text={location.state.removedAddress}
            />
          ) : null}
          <AccountNavigation currentPage={useLocation().pathname} />
          <main className='govuk-main-wrapper'>
            <div class='govuk-grid-row'>
              <div class='govuk-grid-column-full'>
                <h1 className='govuk-heading-l'>Home</h1>
                <SubscribedLocationTableLayout />
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}
