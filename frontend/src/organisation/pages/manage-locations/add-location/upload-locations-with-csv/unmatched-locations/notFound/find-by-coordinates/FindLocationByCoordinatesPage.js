import React from 'react'
import { useNavigate } from 'react-router'
import LocationXYCoordinatesSearchLayout from '../../../../../../../layouts/location/add-or-edit-location/search/xy-coords/LocationXYCoordinatesSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationByCoordinatesPage () {
  const navigate = useNavigate()

  const navigateToNotInEngland = () => {
    navigate(
      orgManageLocationsUrls.unmatchedLocations.notFound.notInEngland
        .coordinates
    )
  }

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.confirm)
  }

  return (
    <>
      <LocationXYCoordinatesSearchLayout
        navigateToNextPage={navigateToNextPage}
        navigateToNotInEngland={navigateToNotInEngland}
        flow='unmatched-locations-not-found'
      />
    </>
  )
}
