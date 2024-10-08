import React from 'react'
import { useLocation } from 'react-router-dom'
import NotInEnglandLayout from '../../../../../../layouts/location/unmatched-locations/NotInEnglandLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function XYCoordinatesNotInEnglandPage () {
  const location = useLocation()
  const postCodeSearchUrl = orgManageLocationsUrls.add.search.postCodeSearch
  const addXyCoordinatesSearchUrl = orgManageLocationsUrls.add.search.xyCoordinatesSearch
  const editXyCoordinatesSearchUrl = orgManageLocationsUrls.edit.editLocationCoords.xyCoordinatesSearch
  const manuallyFindMapUrl = orgManageLocationsUrls.unmatchedLocations.manuallyfind.map
  const isAddingLocation = location.pathname.includes('add')

  const NavigateToNextPage = () => {

  }
  return (
    <NotInEnglandLayout
      NavigateToNextPage={NavigateToNextPage}
      postCodeSearchUrl={postCodeSearchUrl}
      xyCoordinatesSearchUrl={isAddingLocation ? addXyCoordinatesSearchUrl : editXyCoordinatesSearchUrl}
      manuallyFindMapUrl={manuallyFindMapUrl}
    />
  )
}
