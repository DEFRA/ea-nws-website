import { React, useEffect } from 'react'
import { useLocation } from 'react-router'
import AccountNavigation from '../../custom-components/AccountNavigation'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import NotificationBanner from '../../gov-uk-components/NotificationBanner'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import SubscribedLocationTableLayout from '../manage-locations/SubscribedLocationTable'

export default function HomePage () {
  const location = useLocation()

  // remove added/removed location success banners
  useEffect(() => {
    window.history.replaceState({}, location.pathname)
  }, [location])

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <AccountNavigation currentPage={useLocation().pathname} />
          {location.state !== null && location.state.removedLocation && (
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-0 govuk-!-margin-top-4'
              title='Success'
              heading='Location removed'
              text={location.state.removedLocation}
            />
          )}
          <main className='govuk-main-wrapper'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-full'>
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
        </div>
        <Footer />
      </div>
    </>
  )
}
