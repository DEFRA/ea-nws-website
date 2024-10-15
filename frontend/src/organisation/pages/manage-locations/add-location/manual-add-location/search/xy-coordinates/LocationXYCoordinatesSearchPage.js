import React from 'react'
import LocationXYCoordinatesSearchLayout from '../../../../../../layouts/location/search/LocationXYCoordinatesSearchLayout'
import { useNavigate } from 'react-router'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'
export default function LocationXYCoordinatesSearchPage () {
  const navigate = useNavigate()

  const navigateToNotInEngland = () => {
    navigate(orgManageLocationsUrls.add.error.xyCoordinatesNotInEngland)
  }
  const allFloodAreasAvailable = () => {
    navigate('/organisation/manage-locations/add/location-in-area/xy-coordinates-search/all')
  }
  const floodAlertAreasAvailableOnly = () => {
    navigate('/organisation/manage-locations/add/location-in-area/xy-coordinates-search/alerts')
  }
  const noFloodAreasAvailable = () => {
    navigate('/organisation/manage-locations/add/location-in-area/xy-coordinates-search/no-alerts')
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
