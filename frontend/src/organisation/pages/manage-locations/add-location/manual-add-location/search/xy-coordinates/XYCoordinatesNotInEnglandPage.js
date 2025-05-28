import React from 'react'
import { Helmet } from 'react-helmet'
import NotInEnglandLayout from '../../../../../../layouts/location/add-or-edit-location/error/NotInEnglandLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function XYCoordinatesNotInEnglandPage () {
  const postCodeSearchUrl = orgManageLocationsUrls.add.search.postCodeSearch

  const xyCoordsSearchUrl =
    orgManageLocationsUrls.add.search.xyCoordinatesSearch

  const dropPinSearchUrl = orgManageLocationsUrls.add.search.dropPinSearch

  return (
    <>
      <Helmet>
        <title>Location Not In England - GOV.UK</title>
      </Helmet>
      <NotInEnglandLayout
        postCodeSearchUrl={postCodeSearchUrl}
        xyCoordinatesSearchUrl={xyCoordsSearchUrl}
        dropPinSearchUrl={dropPinSearchUrl}
        flow='xyCoordinate'
      />
    </>
  )
}
