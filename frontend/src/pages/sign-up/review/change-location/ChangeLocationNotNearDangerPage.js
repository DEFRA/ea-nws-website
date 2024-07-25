import React from 'react'
import { useNavigate } from 'react-router'
import LocationNotNearDangerLayout from '../../../../common-layouts/location/LocationNotNearDangerLayout'

export default function ChangeLocationNotNearDangerPage() {
  const navigate = useNavigate()
  const continueToSearchResultsPage = () => {
    navigate('/signup/review/change-location-search')
  }

  return (
    <>
      <LocationNotNearDangerLayout
        continueToSearchResultsPage={continueToSearchResultsPage}
      />
    </>
  )
}
