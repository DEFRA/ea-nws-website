import React from 'react'
import { useNavigate } from 'react-router'
import PostCodeSearchLayout from '../../../../../../layouts/location/add-or-edit-location/search/postcode/PostCodeSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationByPostcodePage () {
  const navigate = useNavigate()

  const navigateToNextPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.address)

  const navigateToNotInEnglandPage = () =>
    navigate(
      orgManageLocationsUrls.unmatchedLocations.notInEngland.notInEngland
        .postcode
    )

  return (
    <>
      <PostCodeSearchLayout
        navigateToNextPage={navigateToNextPage}
        navigateToNotInEnglandPage={navigateToNotInEnglandPage}
        flow='unmatched-locations-not-in-england'
      />
    </>
  )
}
