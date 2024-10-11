import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotInEnglandLayout from '../../../../../layouts/location/unmatched-locations/NotInEnglandLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function NotInEnglandPage() {
  const navigate = useNavigate()

  const NavigateToPreviousPage = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.map)
  }

  const NavigateToNextPage = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.index, {
      state: 'NotAdded'
    })
  }

  return (
    <NotInEnglandLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
