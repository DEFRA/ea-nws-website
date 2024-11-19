import { React } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ConfirmLocationLayout from '../../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmLocationPage () {
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

  const navigateToPinDropFlow = () => {
    navigate(
      orgManageLocationsUrls.edit.individualLocation.location.dropPin.drop
    )
  }

  return (
    <>
      <ConfirmLocationLayout
        navigateToNextPage={navigateToNextPage}
        navigateToPinDropFlow={navigateToPinDropFlow}
      />
    </>
  )
}
