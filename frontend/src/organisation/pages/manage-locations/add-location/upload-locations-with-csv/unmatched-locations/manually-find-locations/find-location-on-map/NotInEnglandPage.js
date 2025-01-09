import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotInEnglandLayout from '../../../../../../../layouts/location/add-or-edit-location/error/NotInEnglandLayout'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

// TODO - REVIEWER - PLEASE REMIND ME ABOUT THIS PAGE

export default function NotInEnglandPage () {
  const navigate = useNavigate()

  const NavigateToPreviousPage = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.map)
  }

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.index, {
      state: 'NotAdded'
    })
  }

  return (
    <NotInEnglandLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      locationType='csvUpload'
    />
  )
}
