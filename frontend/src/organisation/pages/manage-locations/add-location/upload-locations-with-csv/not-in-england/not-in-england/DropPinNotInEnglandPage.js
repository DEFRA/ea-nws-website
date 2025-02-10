import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotInEnglandLayout from '../../../../../../layouts/location/add-or-edit-location/error/NotInEnglandLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function DropPinNotInEnglandPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.dashboard)
  }

  const postCodeSearchUrl =
    orgManageLocationsUrls.unmatchedLocations.notInEngland.postcode

  const xyCoordsSearchUrl =
    orgManageLocationsUrls.unmatchedLocations.notInEngland.coordinates

  const dropPinSearchUrl =
    orgManageLocationsUrls.unmatchedLocations.notInEngland.map

  return (
    <NotInEnglandLayout
      navigateToNextPage={navigateToNextPage}
      postCodeSearchUrl={postCodeSearchUrl}
      xyCoordinatesSearchUrl={xyCoordsSearchUrl}
      dropPinSearchUrl={dropPinSearchUrl}
      flow='dropPin'
    />
  )
}
