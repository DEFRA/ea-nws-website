import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DropPinOnMapLayout from '../../../../../../layouts/location/add-or-edit-location/search/drop-pin/DropPinOnMapLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationByDropPinPage () {
  const navigate = useNavigate()
  const currentLocation = useSelector((state) => state.session.currentLocation)

  const navigateToNextPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.dashboard, {
      state: {
        addedLocation: currentLocation.additionals[0].value.s
      }
    })

  const navigateToNotInEnglandPage = () =>
    navigate(
      orgManageLocationsUrls.unmatchedLocations.notInEngland.notInEngland
        .dropPin
    )

  const navigateToDropPinLocationSearchPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.map)

  return (
    <>
      <Helmet>
        <title>Find location by dropping pin - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <DropPinOnMapLayout
        navigateToNextPage={navigateToNextPage}
        navigateToNotInEnglandPage={navigateToNotInEnglandPage}
        navigateToDropPinLocationSearchPage={navigateToDropPinLocationSearchPage}
        flow='unmatched-locations-not-in-england'
      />
    </>
  )
}
