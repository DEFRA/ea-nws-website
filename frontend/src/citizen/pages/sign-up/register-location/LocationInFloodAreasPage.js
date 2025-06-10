import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInFloodAreasLayout from '../../../layouts/location/LocationInFloodAreasLayout'

export default function LocationInSevereWarningAreaPage() {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/signup')
  }

  const continueToSearchResultsPage = () => {
    navigate('/signup/register-location/search-results')
  }

  return (
    <>
      <LocationInFloodAreasLayout
        continueToNextPage={continueToNextPage}
        continueToSearchResultsPage={continueToSearchResultsPage}
        updateGeoSafeProfile={false}
      />
    </>
  )
}
