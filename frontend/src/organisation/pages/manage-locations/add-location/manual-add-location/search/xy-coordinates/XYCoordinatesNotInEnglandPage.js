import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NotInEnglandLayout from '../../../../../../layouts/location/unmatched-locations/NotInEnglandLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function XYCoordinatesNotInEnglandPage () {
  const location = useLocation()
  const navigate = useNavigate()
  const postCodeSearchUrl = orgManageLocationsUrls.add.search.postCodeSearch
  const addXyCoordinatesSearchUrl =
    orgManageLocationsUrls.add.search.xyCoordinatesSearch
  const editXyCoordinatesSearchUrl =
    orgManageLocationsUrls.edit.individualLocation.editLocationCoords
      .xyCoordinatesSearch
  const manuallyFindMapUrl =
    orgManageLocationsUrls.unmatchedLocations.manuallyfind.map
  const isAddingLocation = location.pathname.includes('add')

  const NavigateToPreviousPage = () => [navigate(-1)]

  return (
    <NotInEnglandLayout
      NavigateToPreviousPage={NavigateToPreviousPage}
      postCodeSearchUrl={postCodeSearchUrl}
      xyCoordinatesSearchUrl={
        isAddingLocation
          ? addXyCoordinatesSearchUrl
          : editXyCoordinatesSearchUrl
      }
      manuallyFindMapUrl={manuallyFindMapUrl}
    />
  )
}
