import React from 'react'
import { useNavigate } from 'react-router-dom'
import DropPinOnMapLayout from '../../../../../../layouts/location/add-or-edit-location/search/drop-pin/DropPinOnMapLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function DropPinOnMapPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.individualLocation)
  }

  const navigateToDropPinLocationSearchPage = () => {
    navigate(
      orgManageLocationsUrls.edit.individualLocation.location.dropPin.search
    )
  }

  const navigateToNotInEnglandPage = () => {
    navigate(
      orgManageLocationsUrls.edit.individualLocation.location.dropPin.error
    )
  }

  return (
    <DropPinOnMapLayout
      navigateToNextPage={navigateToNextPage}
      navigateToNotInEnglandPage={navigateToNotInEnglandPage}
      navigateToDropPinLocationSearchPage={navigateToDropPinLocationSearchPage}
    />
  )
}
