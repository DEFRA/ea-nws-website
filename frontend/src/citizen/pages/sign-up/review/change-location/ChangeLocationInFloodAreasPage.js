import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInFloodAreasLayout from '../../../../layouts/location/LocationInFloodAreasLayout'

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
      <LocationInFloodAreasLayout
        continueToNextPage={continueToNextPage}
        continueToSearchResultsPage={continueToSearchResultsPage}
      />
    </>
  )
}
