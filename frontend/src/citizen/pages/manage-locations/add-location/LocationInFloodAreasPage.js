import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationInFloodAreasLayout from '../../../layouts/location/LocationInFloodAreasLayout'

export default function LocationInSevereWarningAreaPage() {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    // waiting on feedback from ucd to know what to show in success banner
    navigate('/home', {
      state: {
        locationName: 'new location' //this needs updated once UCD have came back to me
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
