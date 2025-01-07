import { React } from 'react'
import { useNavigate } from 'react-router'
import ConfirmLocationLayout from '../../../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmLocationNotFoundPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.index)
  }

  const navigateToPinDropFlow = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.mapDropPin)
  }

  return (
    <>
      <ConfirmLocationLayout
        navigateToNextPage={navigateToNextPage}
        navigateToPinDropFlow={navigateToPinDropFlow}
        flow='unmatched-locations-not-found'
      />
    </>
  )
}
