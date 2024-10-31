import React from 'react'
import { useNavigate } from 'react-router-dom'
import DropPinOnMapLayout from '../../../../../../layouts/location/add-or-edit-location/search/drop-pin/DropPinOnMapLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function DropPinOnMapPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.search.dropPinSearchResults)
  }

  const NavigateToNotInEnglandPage = () => {
    navigate(orgManageLocationsUrls.add.error.dropPinNotInEngland)
  }

  return (
    <DropPinOnMapLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToNotInEnglandPage={NavigateToNotInEnglandPage}
    />
  )
}
