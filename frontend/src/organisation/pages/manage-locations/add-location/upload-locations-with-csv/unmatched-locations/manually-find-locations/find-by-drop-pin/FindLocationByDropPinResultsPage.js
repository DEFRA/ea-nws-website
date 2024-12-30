import React from 'react'
import { useNavigate } from 'react-router-dom'
import DropPinOnMapLayout from '../../../../../../../layouts/location/add-or-edit-location/search/drop-pin/DropPinOnMapLayout'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationByDropPinResultsPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.uploadLocationsWithCsv.confirm)
  }

  const navigateToNotInEnglandPage = () => {
    navigate(orgManageLocationsUrls.add.error.dropPinNotInEngland)
  }

  return (
    <DropPinOnMapLayout
      navigateToNextPage={navigateToNextPage}
      navigateToNotInEnglandPage={navigateToNotInEnglandPage}
      flow='unmatched-locations'
    />
  )
}
