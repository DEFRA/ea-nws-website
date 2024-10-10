import React from 'react'
import LocationXYCoordinatesSearchLayout from '../../../../../../layouts/location/search/LocationXYCoordinatesSearchLayout'
import { useNavigate } from 'react-router'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'
export default function LocationXYCoordinatesSearchPage () {
  const navigate = useNavigate()

  const navigateToNotInEngland = () => {
    navigate(orgManageLocationsUrls.add.error.xyCoordinatesNotInEngland)
  }
  const allFloodAreasAvailableRoute = () => {
    navigate('/organisation/manage-locations/add/location-in-area/xy-coordinates-search/all')
  }
  const floodAlertAreasAvailableOnlyRoute = () => {
    navigate('/organisation/manage-locations/add/location-in-area/xy-coordinates-search/alerts')
  }
  const noFloodAreasAvailableRoute = () => {
    navigate('/organisation/manage-locations/add/location-in-area/xy-coordinates-search/no-alerts')
  }
  return (
    <>
      <LocationXYCoordinatesSearchLayout
        allFloodAreasAvailableRoute={allFloodAreasAvailableRoute}
        floodAlertAreasAvailableOnlyRoute={floodAlertAreasAvailableOnlyRoute}
        noFloodAreasAvailableRoute={noFloodAreasAvailableRoute}
        navigateToNotInEngland={navigateToNotInEngland}
      />
    </>
  )
}
