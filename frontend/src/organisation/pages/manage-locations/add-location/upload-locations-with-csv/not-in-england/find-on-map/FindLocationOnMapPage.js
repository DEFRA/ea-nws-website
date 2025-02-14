import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationSearchLayout from '../../../../../../layouts/location/add-or-edit-location/search/drop-pin/LocationSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationOnMapPage () {
  const navigate = useNavigate()

  const navigateToNextPage = (mapArea) => {
    navigate(
      orgManageLocationsUrls.unmatchedLocations.notInEngland.mapDropPin,
      {
        state: { mapArea }
      }
    )
  }

  return (
    <LocationSearchLayout
      navigateToNextPage={navigateToNextPage}
      flow='unmatched-locations-not-in-england'
    />
  )
}
