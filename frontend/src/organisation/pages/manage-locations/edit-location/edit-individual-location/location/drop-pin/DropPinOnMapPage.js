import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLocationAdditional } from '../../../../../../../common/redux/userSlice'
import DropPinOnMapLayout from '../../../../../../layouts/location/add-or-edit-location/search/drop-pin/DropPinOnMapLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function DropPinOnMapPage () {
  const navigate = useNavigate()
  const locationName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.viewLocation, {
      state: { successMessage: `${locationName} location changed` }
    })
  }

  const navigateToDropPinLocationSearchPage = () => {
    navigate(
      orgManageLocationsUrls.edit.individualLocation.location.dropPin.search
    )
  }

  const navigateToNotInEnglandPage = () => {
    navigate(
      orgManageLocationsUrls.edit.individualLocation.location.dropPin.error
    )
  }

  return (
    <>
      <Helmet>
        <title>Drop pin on map - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <DropPinOnMapLayout
        navigateToNextPage={navigateToNextPage}
        navigateToNotInEnglandPage={navigateToNotInEnglandPage}
        navigateToDropPinLocationSearchPage={navigateToDropPinLocationSearchPage}
        flow='change-coords'
      />
    </>
  )
}
