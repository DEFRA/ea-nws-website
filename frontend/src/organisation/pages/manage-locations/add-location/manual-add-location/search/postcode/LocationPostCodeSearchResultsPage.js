import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddressSearchLayout from '../../../../../../layouts/location/add-or-edit-location/search/address/AddressSearchLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'
import { Helmet } from 'react-helmet'

export default function LocationPostCodeSearchResultsPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () =>
    navigate(
      orgManageLocationsUrls.add.manualAddLocation.confirmManualSearchedLocation
    )

  const navigateToPreviousPage = () => navigate(-1)

  const navigateToFindPostcodePage = () =>
    navigate(orgManageLocationsUrls.add.search.postCodeSearch)

  const navigateToCannotFindAddressPage = () =>
    navigate(orgManageLocationsUrls.add.error.cannotFindAddress)

  return (
    <>
      <Helmet>
        <title>Select an Address - Next Warning Service GOV.UK</title>
      </Helmet>
      <AddressSearchLayout
        navigateToNextPage={navigateToNextPage}
        navigateToPreviousPage={navigateToPreviousPage}
        navigateToFindPostcodePage={navigateToFindPostcodePage}
        navigateToCannotFindAddressPage={navigateToCannotFindAddressPage}
      />
    </>
  )
}
