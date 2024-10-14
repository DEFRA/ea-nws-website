import React from 'react'
import { useNavigate } from 'react-router'
import LocationXYCoordinatesSearchLayout from '../../../../../../layouts/location/add-or-edit-location/search/xy-coord/LocationXYCoordinatesSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'
export default function LocationXYCoordinatesSearchPage() {
  const navigate = useNavigate()

  const navigateToNotInEngland = () => {
    navigate(orgManageLocationsUrls.add.error.xyCoordinatesNotInEngland)
  }
  const allFloodAreasAvailable = () => {
    navigate(
      '/organisation/manage-locations/add/location-in-area/xy-coordinates-search/all'
    )
  }
  const floodAlertAreasAvailableOnly = () => {
    navigate(
      '/organisation/manage-locations/add/location-in-area/xy-coordinates-search/alerts'
    )
  }
  const noFloodAreasAvailable = () => {
    navigate(
      '/organisation/manage-locations/add/location-in-area/xy-coordinates-search/no-alerts'
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
