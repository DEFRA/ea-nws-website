import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import LocationSearchLayout from '../../../../../../layouts/location/add-or-edit-location/search/drop-pin/LocationSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationOnMapPage () {
  const navigate = useNavigate()

  const navigateToNextPage = (mapArea) => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.mapDropPin, {
      state: { mapArea }
    })
  }

  return (
    <>
      <Helmet>
        <title>Find Location on a Map - Next Warning Service GOV.UK</title>
      </Helmet>
      <LocationSearchLayout
        navigateToNextPage={navigateToNextPage}
        flow='unmatched-locations-not-found'
      />
    </>
  )
}
