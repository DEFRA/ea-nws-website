import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import LocationWithinWarningAreaProximityLayout from '../../../../layouts/location/LocationWithinWarningAreaProximityLayout'

export default function ChangeLocationInWarningAreaProximityPage () {
  const navigate = useNavigate()

  const continueToNearbyFloodAlertsPage = () => {
    navigate(`/signup/review/location-in-proximity-area/${'alert'}`)
  }

  const continueToSelectedFloodWarningsPage = (type) => {
    switch (type) {
      case 'severe':
        navigate('/signup/review/location-in-severe-warning-area')
        break
      case 'alert':
        navigate('/signup/review/location-in-alert-area')
    }
  }

  const continueToSearchResultsPage = () => {
    navigate('/signup/review/change-location-results')
  }

  return (
    <>
      <Helmet>
        <title>You Can Get Flood Messages - Get flood warnings - GOV.UK</title>
      </Helmet>
      <LocationWithinWarningAreaProximityLayout
        continueToSelectedFloodWarningsPage={
          continueToSelectedFloodWarningsPage
        }
        continueToNearbyFloodAlertsPage={continueToNearbyFloodAlertsPage}
        continueToSearchResultsPage={continueToSearchResultsPage}
      />
    </>
  )
}
