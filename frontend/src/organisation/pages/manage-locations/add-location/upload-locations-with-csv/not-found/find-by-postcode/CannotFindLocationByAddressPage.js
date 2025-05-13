import { React } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import CannotFindAddressLayout from '../../../../../../layouts/location/add-or-edit-location/error/CannotFindAddressLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function CannotFindLocationByAddressPage () {
  const navigate = useNavigate()

  const navigateToNextPage = (event) =>
    event.preventDefault()
  navigate(orgManageLocationsUrls.unmatchedLocations.notFound.find)

  const navigateToDifferentPostCode = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.postcode)

  const navigateToDifferentCoordinates = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.coordinates)

  const navigateToFindLocationOnMap = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.map)
  }

  return (
    <>
      <Helmet>
        <title>Cannot Find Location - Next Warning Service GOV.UK</title>
      </Helmet>
      <CannotFindAddressLayout
        navigateToNextPage={navigateToNextPage}
        navigateToDifferentPostCode={navigateToDifferentPostCode}
        navigateToDifferentCoordinates={navigateToDifferentCoordinates}
        navigateToFindLocationOnMap={navigateToFindLocationOnMap}
        flow='unmatched-locations-not-found'
      />
    </>
  )
}
