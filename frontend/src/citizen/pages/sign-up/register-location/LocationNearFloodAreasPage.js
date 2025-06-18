import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationNearFloodAreasLayout from '../../../layouts/location/LocationNearFloodAreasLayout'

export default function LocationNearFloodAreasPage() {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/signup')
  }

  const continueToSearchResultsPage = () => {
    navigate('/signup/register-location/search-results')
  }

  return (
    <>
      <LocationNearFloodAreasLayout
        continueToNextPage={continueToNextPage}
        continueToSearchResultsPage={continueToSearchResultsPage}
        updateGeoSafeProfile={false}
      />
    </>
  )
}
