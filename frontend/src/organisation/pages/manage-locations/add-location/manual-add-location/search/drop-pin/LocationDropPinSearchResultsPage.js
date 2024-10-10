import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationDropPinSearchResultsLayout from '../../../../../../layouts/location/manual-add-or-edit-location/search/drop-pin/LocationDropPinSearchResultsLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationDropPinSearchResultsPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.search.dropPinSearchResults)
  }

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  const NavigateToNotInEnglandPage = () => {
    navigate(orgManageLocationsUrls.add.error.dropPinNotInEngland)
  }

  const differentSearchUrl = orgManageLocationsUrls.add.search.dropPinSearch

  return (
    <LocationDropPinSearchResultsLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      NavigateToNotInEnglandPage={NavigateToNotInEnglandPage}
      DifferentSearchUrl={differentSearchUrl}
    />
  )
}
