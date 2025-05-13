import React from 'react'
import { Helmet } from 'react-helmet'
import NotInEnglandLayout from '../../../../../../layouts/location/add-or-edit-location/error/NotInEnglandLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function NotInEnglandPage () {
  const xyCoordsSearchUrl =
    orgManageLocationsUrls.edit.individualLocation.location.xyCoords.search

  const dropPinSearchUrl =
    orgManageLocationsUrls.edit.individualLocation.location.dropPin.drop

  return (
    <>
      <Helmet>
        <title>Location Not In England - Next Warning Service GOV.UK</title>
      </Helmet>
      <NotInEnglandLayout
        xyCoordinatesSearchUrl={xyCoordsSearchUrl}
        dropPinSearchUrl={dropPinSearchUrl}
        flow='dropPin'
        // navigateToNextPage find out from Alex where this goes
      />
    </>
  )
}
