import { React } from 'react'
import { useNavigate } from 'react-router'
import ConfirmLocationLayout from '../../../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmUnmatchedLocationPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    // TODO: Navigate to correct page
    navigate(orgManageLocationsUrls.add.optionalInformation.optionalInfo)
  }

  const navigateToPinDropFlow = () => {
    // TODO: Navigate to correct page
    navigate(orgManageLocationsUrls.add.search.dropPinSearchResults)
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
