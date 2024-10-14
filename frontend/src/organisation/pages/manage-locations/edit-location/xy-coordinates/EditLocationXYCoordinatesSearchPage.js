import React from 'react'
import { useNavigate } from 'react-router'
import LocationXYCoordinatesSearchLayout from '../../../../layouts/location/add-or-edit-location/search/xy-coord/LocationXYCoordinatesSearchLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function EditLocationXYCoordinatesSearchPage() {
  const navigate = useNavigate()

  const navigateToNotInEngland = () => {
    navigate(orgManageLocationsUrls.edit.error.xyCoordinatesNotInEngland)
  }
  const allFloodAreasAvailable = () => {
    navigate(
      orgManageLocationsUrls.edit.editLocationCoords
        .replace(':flow', 'xy-coordinates-search')
        .replace(':type', 'all')
    )
  }
  const floodAlertAreasAvailableOnly = () => {
    navigate(
      orgManageLocationsUrls.edit.editLocationCoords
        .replace(':flow', 'xy-coordinates-search')
        .replace(':type', 'alerts')
    )
  }
  const noFloodAreasAvailable = () => {
    navigate(
      orgManageLocationsUrls.edit.editLocationCoords
        .replace(':flow', 'xy-coordinates-search')
        .replace(':type', 'no-alerts')
    )
  }
  return (
    <>
      <LocationXYCoordinatesSearchLayout
        allFloodAreasAvailable={allFloodAreasAvailable}
        floodAlertAreasAvailableOnly={floodAlertAreasAvailableOnly}
        noFloodAreasAvailable={noFloodAreasAvailable}
        navigateToNotInEngland={navigateToNotInEngland}
      />
    </>
  )
}
