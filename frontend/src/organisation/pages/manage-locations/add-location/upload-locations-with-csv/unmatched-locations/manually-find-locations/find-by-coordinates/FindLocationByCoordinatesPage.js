import React from 'react'
import { useNavigate } from 'react-router'
import LocationXYCoordinatesSearchLayout from '../../../../../../../layouts/location/add-or-edit-location/search/xy-coords/LocationXYCoordinatesSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationByCoordinatesPage () {
  const navigate = useNavigate()

  const navigateToNotInEngland = () => {
    navigate(orgManageLocationsUrls.add.error.xyCoordinatesNotInEngland)
  }

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.find.confirm)
  }

  return (
    <>
      <LocationXYCoordinatesSearchLayout
        navigateToNextPage={navigateToNextPage}
        navigateToNotInEngland={navigateToNotInEngland}
        flow='unmatched-locations'
      />
    </>
  )
}
