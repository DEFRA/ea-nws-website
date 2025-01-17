import { React } from 'react'
import { useNavigate } from 'react-router'
import ConfirmLocationLayout from '../../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmLocationPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.viewLocation, {
      state: { successMessage: 'X and Y coordinates changed' }
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
