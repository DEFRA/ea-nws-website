import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationWithinWarningAreaProximityLayout from '../../../layouts/location/LocationWithinWarningAreaProximityLayout'

export default function LocationInWarningAreaProximityPage () {
  const navigate = useNavigate()

  const continueToNearbyFloodAlertsPage = () => {
    navigate(`/manage-locations/add/location-in-proximity-area/${'alert'}`)
  }

  const continueToSelectedFloodWarningsPage = (type) => {
    switch (type) {
      case 'severe':
        navigate('/manage-locations/add/location-in-severe-warning-area')
        break
      case 'alert':
        navigate('/manage-locations/add/location-in-alert-area')
    }
  }

  const continueToSearchResultsPage = () => {
    navigate('/manage-locations/add/search-results')
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
