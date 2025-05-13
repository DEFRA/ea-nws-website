import React from 'react'
import { Helmet } from 'react-helmet'
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

  const navigateToCannotFindAddressPage = () =>
    navigate(
      orgManageLocationsUrls.unmatchedLocations.notFound.cannotFindAddress
    )

  return (
    <>
      <Helmet>
        <title>Find Location By Address - Next Warning Service GOV.UK</title>
      </Helmet>
      <AddressSearchLayout
        navigateToNextPage={navigateToNextPage}
        navigateToPreviousPage={navigateToPreviousPage}
        navigateToFindPostcodePage={navigateToFindPostcodePage}
        navigateToCannotFindAddressPage={navigateToCannotFindAddressPage}
        flow='unmatched-locations-not-found'
      />
    </>
  )
}
