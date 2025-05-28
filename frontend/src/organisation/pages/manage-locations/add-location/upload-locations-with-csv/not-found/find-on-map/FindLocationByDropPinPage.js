import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLocationAdditional } from '../../../../../../../common/redux/userSlice'
import DropPinOnMapLayout from '../../../../../../layouts/location/add-or-edit-location/search/drop-pin/DropPinOnMapLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationByDropPinPage () {
  const navigate = useNavigate()
  const locationName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )

  const navigateToNextPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.dashboard, {
      state: {
        addedLocation: locationName
      }
    })

  const navigateToNotInEnglandPage = () =>
    navigate(
      orgManageLocationsUrls.unmatchedLocations.notFound.notInEngland.dropPin
    )

  const navigateToDropPinLocationSearchPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.map)

  return (
    <>
      <Helmet>
        <title>Find Location on a Map - GOV.UK</title>
      </Helmet>
      <DropPinOnMapLayout
        navigateToNextPage={navigateToNextPage}
        navigateToNotInEnglandPage={navigateToNotInEnglandPage}
        navigateToDropPinLocationSearchPage={navigateToDropPinLocationSearchPage}
        flow='unmatched-locations-not-found'
      />
    </>
  )
}
