import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import NotInEnglandLayout from '../../../../../../layouts/location/add-or-edit-location/error/NotInEnglandLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function CoordinatesNotInEnglandPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.dashboard)
  }

  const postCodeSearchUrl =
    orgManageLocationsUrls.unmatchedLocations.notFound.postcode

  const xyCoordsSearchUrl =
    orgManageLocationsUrls.unmatchedLocations.notFound.coordinates

  const dropPinSearchUrl =
    orgManageLocationsUrls.unmatchedLocations.notFound.map

  return (
    <>
      <Helmet>
        <title>Location not in england - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <NotInEnglandLayout
        navigateToNextPage={navigateToNextPage}
        postCodeSearchUrl={postCodeSearchUrl}
        xyCoordinatesSearchUrl={xyCoordsSearchUrl}
        dropPinSearchUrl={dropPinSearchUrl}
        flow='coordinates'
      />
    </>
  )
}
