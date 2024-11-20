import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocationSearchLayout from '../../../../../../layouts/location/add-or-edit-location/search/drop-pin/LocationSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationSearchPage () {
  const navigate = useNavigate()

  const navigateToNextPage = (mapArea) => {
    navigate(
      orgManageLocationsUrls.edit.individualLocation.location.dropPin.drop,
      {
        state: { mapArea }
      }
    )
  }

  return <LocationSearchLayout navigateToNextPage={navigateToNextPage} />
}
