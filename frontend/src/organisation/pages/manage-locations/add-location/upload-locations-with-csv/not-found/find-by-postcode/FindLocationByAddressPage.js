import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddressSearchLayout from '../../../../../../layouts/location/add-or-edit-location/search/address/AddressSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationByAddressPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.confirm)

  const navigateToPreviousPage = () => navigate(-1)

  const navigateToFindPostcodePage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.postcode)

  const navigateToCannotFindAddressPage = (event) =>
    event.preventDefault()
  navigate(
    orgManageLocationsUrls.unmatchedLocations.notFound.cannotFindAddress
  )

  return (
    <AddressSearchLayout
      navigateToNextPage={navigateToNextPage}
      navigateToPreviousPage={navigateToPreviousPage}
      navigateToFindPostcodePage={navigateToFindPostcodePage}
      navigateToCannotFindAddressPage={navigateToCannotFindAddressPage}
      flow='unmatched-locations-not-found'
    />
  )
}
