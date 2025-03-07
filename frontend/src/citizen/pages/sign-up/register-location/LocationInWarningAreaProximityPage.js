import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationWithinWarningAreaProximityLayout from '../../../layouts/location/LocationWithinWarningAreaProximityLayout'

export default function LocationInWarningAreaProximityPage () {
  const navigate = useNavigate()

  const continueToNearbyFloodAlertsPage = (event) => {
    event.preventDefault()
    navigate(`/signup/register-location/location-in-proximity-area/${'alert'}`)
  }

  const continueToSelectedFloodWarningsPage = (type) => {
    switch (type) {
      case 'severe':
        navigate('/signup/register-location/location-in-severe-warning-area')
        break
      case 'alert':
        navigate('/signup/register-location/location-in-alert-area')
    }
  }

  const continueToSearchResultsPage = () => {
    navigate('/signup/register-location/search-results')
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
