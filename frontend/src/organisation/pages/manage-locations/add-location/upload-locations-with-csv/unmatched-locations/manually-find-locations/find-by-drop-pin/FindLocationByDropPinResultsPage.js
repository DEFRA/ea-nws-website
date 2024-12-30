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
    navigate(
      orgManageLocationsUrls.unmatchedLocations.find.notInEngland.dropPin
    )
  }

  const navigateToDropPinLocationSearchPage = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.find.dropPin.search)
  }

  return (
    <DropPinOnMapLayout
      navigateToNextPage={navigateToNextPage}
      navigateToNotInEnglandPage={navigateToNotInEnglandPage}
      navigateToDropPinLocationSearchPage={navigateToDropPinLocationSearchPage}
      flow='unmatched-locations'
    />
  )
}
