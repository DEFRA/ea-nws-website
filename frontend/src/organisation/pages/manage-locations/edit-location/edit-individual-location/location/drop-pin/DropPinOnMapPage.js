import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DropPinOnMapLayout from '../../../../../../layouts/location/add-or-edit-location/search/drop-pin/DropPinOnMapLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function DropPinOnMapPage() {
  const navigate = useNavigate()
  const locationName = useSelector(
    (state) =>
      state.session.currentLocation.meta_data.location_additional.location_name
  )

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.viewLocation, {
      state: { successMessage: `${locationName} location changed` }
    })
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
