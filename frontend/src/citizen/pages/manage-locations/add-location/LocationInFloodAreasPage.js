import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInFloodAreasLayout from '../../../layouts/location/LocationInFloodAreasLayout'

export default function LocationInFloodAreasPage() {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/home', {
      state: {
        locationName: 'New location added'
      }
    })
  }

  const searchResultsPage = '/manage-locations/add/search-results'

  return (
    <>
      <LocationInFloodAreasLayout
        continueToNextPage={continueToNextPage}
        searchResultsPage={searchResultsPage}
      />
    </>
  )
}
