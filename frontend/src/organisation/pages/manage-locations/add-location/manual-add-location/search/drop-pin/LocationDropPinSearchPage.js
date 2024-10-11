import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationDropPinSearchLayout from '../../../../../../layouts/location/manual-add-or-edit-location/search/drop-pin/LocationDropPinSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationDropPinSearchPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.search.dropPinSearchResults)
  }

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <LocationDropPinSearchLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
