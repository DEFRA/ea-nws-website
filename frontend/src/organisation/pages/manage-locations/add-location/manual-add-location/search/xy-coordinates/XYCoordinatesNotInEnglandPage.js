import React from 'react'
import NotInEnglandLayout from '../../../../../../layouts/location/add-or-edit-location/error/NotInEnglandLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function XYCoordinatesNotInEnglandPage () {
  const postCodeSearchUrl = orgManageLocationsUrls.add.search.postCodeSearch

  const xyCoordsSearchUrl =
    orgManageLocationsUrls.add.search.xyCoordinatesSearch

  const dropPinSearchUrl = orgManageLocationsUrls.add.search.dropPinSearch

  return (
    <NotInEnglandLayout
      postCodeSearchUrl={postCodeSearchUrl}
      xyCoordinatesSearchUrl={xyCoordsSearchUrl}
      dropPinSearchUrl={dropPinSearchUrl}
      flow='xyCoordinate'
    />
  )
}
