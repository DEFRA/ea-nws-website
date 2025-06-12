import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInFloodAreasLayout from '../../../layouts/location/LocationInFloodAreasLayout'

export default function LocationInSevereWarningAreaPage() {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/home', {
      state: {
        locationName: 'New location added'
      }
    })
  }

  const continueToSearchResultsPage = () => {
    navigate('/manage-locations/add/search-results')
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
