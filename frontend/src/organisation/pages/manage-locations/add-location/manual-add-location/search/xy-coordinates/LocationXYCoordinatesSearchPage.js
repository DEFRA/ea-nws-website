import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import LocationXYCoordinatesSearchLayout from '../../../../../../layouts/location/add-or-edit-location/search/xy-coords/LocationXYCoordinatesSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationXYCoordinatesSearchPage () {
  const navigate = useNavigate()

  const navigateToNotInEngland = () => {
    navigate(orgManageLocationsUrls.add.error.xyCoordinatesNotInEngland)
  }

  const navigateToNextPage = () => {
    navigate(
      orgManageLocationsUrls.add.manualAddLocation.confirmManualSearchedLocation
    )
  }

  return (
    <>
      <Helmet>
        <title>X and Y Coordinate Search - GOV.UK</title>
      </Helmet>
      <LocationXYCoordinatesSearchLayout
        navigateToNextPage={navigateToNextPage}
        navigateToNotInEngland={navigateToNotInEngland}
      />
    </>
  )
}
