import React from 'react'
import NotInEnglandLayout from '../../../../../../layouts/location/add-or-edit-location/error/NotInEnglandLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function NotInEnglandPage () {
  const xyCoordsSearchUrl =
    orgManageLocationsUrls.edit.individualLocation.location.xyCoords.search

  const dropPinSearchUrl =
    orgManageLocationsUrls.edit.individualLocation.location.dropPin.drop

  return (
    <NotInEnglandLayout
      xyCoordinatesSearchUrl={xyCoordsSearchUrl}
      dropPinSearchUrl={dropPinSearchUrl}
      flow='dropPin'
      // navigateToNextPage find out from Alex where this goes
    />
  )
}
