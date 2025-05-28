import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import { setSigninType } from '../../../common/redux/userSlice'
import SubscribedLocationTableLayout from '../manage-locations/SubscribedLocationTable'

export default function HomePage () {
  const location = useLocation()
  const [error, setError] = useState(null)

  // remove added/removed location success banners
  useEffect(() => {
    window.history.replaceState({}, location.pathname)
  }, [location])

  // Set signin type
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSigninType('citizen'))
  }, [])

  return (
    <>
      <Helmet>
        <title>Locations and message preferences - GOV.UK</title>
      </Helmet>
      {location.state !== null && location.state.removedLocation && (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-0 govuk-!-margin-top-4'
          title='Success'
          heading='Location removed'
          text={location.state.removedLocation}
        />
      )}
      {error && <ErrorSummary errorList={[error]} />}
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
            <h1 className='govuk-heading-l'>Locations and message preferences</h1>
            <SubscribedLocationTableLayout setError={setError} />
          </div>
        </div>
      </main>
    </>
  )
}
