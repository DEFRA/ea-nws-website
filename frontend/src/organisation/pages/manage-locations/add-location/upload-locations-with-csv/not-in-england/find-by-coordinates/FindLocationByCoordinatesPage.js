import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import LocationXYCoordinatesSearchLayout from '../../../../../../layouts/location/add-or-edit-location/search/xy-coords/LocationXYCoordinatesSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationByCoordinatesPage () {
  const navigate = useNavigate()

  const navigateToNotInEngland = () => {
    navigate(
      orgManageLocationsUrls.unmatchedLocations.notInEngland.notInEngland
        .coordinates
    )
  }

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.confirm)
  }

  return (
    <>
      <Helmet>
        <title>Find location by coordinates - GOV.UK</title>
      </Helmet>
      <LocationXYCoordinatesSearchLayout
        navigateToNextPage={navigateToNextPage}
        navigateToNotInEngland={navigateToNotInEngland}
        flow='unmatched-locations-not-in-england'
      />
    </>
  )
}
