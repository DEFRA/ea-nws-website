import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationSearchLayout from '../../../../../../layouts/location/add-or-edit-location/search/drop-pin/LocationSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationSearchPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.search.dropPinSearchResults)
  }

  return <LocationSearchLayout navigateToNextPage={NavigateToNextPage} />
}
