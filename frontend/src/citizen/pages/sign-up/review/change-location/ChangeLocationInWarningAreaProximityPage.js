import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationWithinWarningAreaProximityLayout from '../../../../layouts/location/LocationWithinWarningAreaProximityLayout'

export default function ChangeLocationInWarningAreaProximityPage () {
  const navigate = useNavigate()

  const continueToNearbyFloodAlertsPage = (event) => {
    event.preventDefault()
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
