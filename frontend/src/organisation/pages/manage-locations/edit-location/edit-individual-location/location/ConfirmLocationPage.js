import { React } from 'react'
import { useNavigate } from 'react-router'
import ConfirmLocationLayout from '../../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmLocationPage() {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.individualLocation)
  }

  const navigateToPinDropFlow = () => {
    console.log('hit')
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
