import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotInEnglandLayout from '../../../../../../../layouts/location/add-or-edit-location/error/NotInEnglandLayout'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function DropPinNotInEnglandPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.uploadLocationsWithCsv.confirm)
  }

  const postCodeSearchUrl =
    orgManageLocationsUrls.unmatchedLocations.notFound.postcode

  const xyCoordsSearchUrl =
    orgManageLocationsUrls.unmatchedLocations.notFound.coordinates

  const dropPinSearchUrl =
    orgManageLocationsUrls.unmatchedLocations.notFound.map

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
