import React from 'react'
import { useNavigate } from 'react-router'
import PostCodeSearchLayout from '../../../../../../../layouts/location/add-or-edit-location/search/postcode/PostCodeSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationPostCodeSearchPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.find.address)

  const navigateToNotInEnglandPage = () =>
    navigate(
      orgManageLocationsUrls.unmatchedLocations.find.notInEngland.postcode
    )

  return (
    <>
      <PostCodeSearchLayout
        navigateToNextPage={navigateToNextPage}
        navigateToNotInEnglandPage={navigateToNotInEnglandPage}
        flow='unmatched-locations'
      />
    </>
  )
}
