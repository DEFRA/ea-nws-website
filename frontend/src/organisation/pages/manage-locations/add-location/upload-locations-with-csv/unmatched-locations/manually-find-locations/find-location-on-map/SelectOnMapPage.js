import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SelectOnMapLayout from '../../../../../../../layouts/location/upload-locations-with-csv/unmatched-locations/SelectOnMapLayout'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function SelectOnMapPage () {
  const navigate = useNavigate()
  const fullAddress = useSelector((state) => state.session.currentLocation.meta_data.location_additional.full_address)

  const NavigateToPreviousPage = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.areaName)
  }

  const NavigateToNotFound = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.notInEngland)
  }

  const NavigateToNextPage = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.index, {
      state: 'Added'
    })
  }

  return (
    <SelectOnMapLayout
      fullAddress={fullAddress}
      NavigateToPreviousPage={NavigateToPreviousPage}
      NavigateToNextPage={NavigateToNextPage}
      NavigateToNotFound={NavigateToNotFound}
    />
  )
}
