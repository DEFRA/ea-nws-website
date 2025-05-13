import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import LocationSearchLayout from '../../../../../../layouts/location/add-or-edit-location/search/drop-pin/LocationSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationSearchPage () {
  const navigate = useNavigate()

  const navigateToNextPage = (mapArea) => {
    navigate(orgManageLocationsUrls.add.search.dropPinSearchResults, {
      state: { mapArea }
    })
  }

  return (
    <>
      <Helmet>
        <title>Find Location - Next Warning Service GOV.UK</title>
      </Helmet>
      <LocationSearchLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
