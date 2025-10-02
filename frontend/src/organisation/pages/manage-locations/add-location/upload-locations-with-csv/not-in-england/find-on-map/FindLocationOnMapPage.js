import React from 'react'
import { Helmet } from 'react-helmet'
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
    <>
      <Helmet>
        <title>Find location on a map - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <LocationSearchLayout
        navigateToNextPage={navigateToNextPage}
        flow='unmatched-locations-not-in-england'
      />
    </>
  )
}
