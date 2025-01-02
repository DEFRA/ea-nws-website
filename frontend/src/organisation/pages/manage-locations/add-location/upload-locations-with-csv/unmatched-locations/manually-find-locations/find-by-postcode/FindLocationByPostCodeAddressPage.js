import React from 'react'
import { useNavigate } from 'react-router-dom'
import SearchAddressResultLayout from '../../../../../../../layouts/address/SearchAddressResultLayout'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function SelectAddressPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.find.confirm)

  const navigateToPreviousPage = () => navigate(-1)

  const navigateToCannotFindAddressPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.find.cannotFindAddress)

  return (
    <SearchAddressResultLayout
      navigateToNextPage={navigateToNextPage}
      navigateToPreviousPage={navigateToPreviousPage}
      navigateToCannotFindAddressPage={navigateToCannotFindAddressPage}
      flow='unmatched-locations'
    />
  )
}
