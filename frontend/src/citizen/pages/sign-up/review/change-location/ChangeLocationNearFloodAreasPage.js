import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationNearFloodAreasLayout from '../../../../layouts/location/LocationNearFloodAreasLayout'

export default function ChangeLocationInFloodAreasPage() {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/signup/review')
  }

  const continueToSearchResultsPage = () => {
    navigate('/signup/review/change-location-results')
  }

  return (
    <>
      <LocationNearFloodAreasLayout
        continueToNextPage={continueToNextPage}
        continueToSearchResultsPage={continueToSearchResultsPage}
      />
    </>
  )
}
