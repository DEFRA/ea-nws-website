import React from 'react'
import LocationXYCoordinatesSearchLayout from '../../../../../../layouts/location/LocationXYCoordinatesSearchLayout'
import { useNavigate } from 'react-router'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'
export default function LocationXYCoordinatesSearchPage () {
  const navigate = useNavigate()

  const navigateToNotInEngland = () => {
    navigate(orgManageLocationsUrls.add.error.xyCoordinatesNotInEngland)
  }
  return (
    <>
      <LocationXYCoordinatesSearchLayout
        allFloodAreasAvailbleRoute='/organisation/manage-locations/add/location-in-area/xy-coordinates-search/all'
        floodAlertAreasAvailbleOnlyRoute='/organisation/manage-locations/add/location-in-area/xy-coordinates-search/alerts'
        noFloodAreasAvailbleRoute='/organisation/manage-locations/add/location-in-area/xy-coordinates-search/no-alerts'
        navigateToNotInEngland={navigateToNotInEngland}
      />
    </>
  )
}
