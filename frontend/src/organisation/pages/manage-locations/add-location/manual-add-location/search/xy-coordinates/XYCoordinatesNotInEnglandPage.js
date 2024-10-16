import React from 'react'
import NotInEnglandLayout from '../../../../../../layouts/location/unmatched-locations/NotInEnglandLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function XYCoordinatesNotInEnglandPage () {
  const postCodeSearchUrl = orgManageLocationsUrls.add.search.postCodeSearch
  const addXyCoordinatesSearchUrl =
    orgManageLocationsUrls.add.search.xyCoordinatesSearch
  const manuallyFindMapUrl =
    orgManageLocationsUrls.unmatchedLocations.manuallyfind.map

  return (
    <NotInEnglandLayout
      postCodeSearchUrl={postCodeSearchUrl}
      xyCoordinatesSearchUrl={addXyCoordinatesSearchUrl}
      manuallyFindMapUrl={manuallyFindMapUrl}
    />
  )
}
