import { React } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import ConfirmLocationLayout from '../../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmLocationPage() {
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
      <Helmet>
        <title>Confirm Location - Next Warning Service GOV.UK</title>
      </Helmet>
      <ConfirmLocationLayout
        navigateToNextPage={navigateToNextPage}
        navigateToPinDropFlow={navigateToPinDropFlow}
        flow='change-coords'
      />
    </>
  )
}
